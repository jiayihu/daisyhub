import { all, call, take, takeLatest, race, select } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/bulletin.actions';
import {
  getBulletins,
  getRealtimeVisitors,
  getRealtimeBulletin,
  deleteBulletin,
  lockBulletinQueue,
} from '../../services/bulletins.service';
import { handleSagaError } from './handleSagaError';
import { EventSource } from '../../services/real-time';
import { eventChannel, EventChannel } from 'redux-saga';
import { Visitor } from '../../types/visitor';
import { Bulletin } from '../../types/bulletin';
import { getStaticBulletinSelector } from '../reducers';
import { push } from '../middlewares/router.middleware';

type END_REALTIME = { type: 'END_REALTIME' };

const isEndMessage = (message: any): message is END_REALTIME =>
  (message as END_REALTIME).type === 'END_REALTIME';

function createRealTimeChannel<T>(source: EventSource<T>) {
  return eventChannel<T | END_REALTIME>(emit => {
    source.subscribe(data => {
      // If there is no data then it has been deleted probably
      data ? emit(data) : emit({ type: 'END_REALTIME' });
    });

    return () => source.unsubscribe();
  });
}

function* fetchBulletinsSaga() {
  try {
    const bulletins = yield call<typeof getBulletins>(getBulletins);
    yield put(actions.getBulletinsSucceeded(bulletins));
  } catch (error) {
    yield* handleSagaError(error);
  }
}

function* watchBulletinSaga(action: ReturnType<typeof actions.getBulletin>) {
  const bulletinId = action.payload.bulletinId;
  const source = getRealtimeBulletin(bulletinId);

  // Try to retrieve a static version from the list
  const bulletin = yield select(getStaticBulletinSelector(bulletinId));
  if (bulletin) yield put(actions.updateBulletin(bulletin));

  // Start real-time updates
  const channel: EventChannel<Bulletin> = yield call(createRealTimeChannel, source);

  try {
    while (true) {
      const { message, cancel } = yield race({
        message: take(channel),
        cancel: take(actions.UNSUBSCRIBE_TO_BULLETIN),
      });

      if (message && isEndMessage(message)) yield put(actions.notifyUnsubBulletin());
      else if (cancel) channel.close();
      else if (message) yield put(actions.updateBulletin(message));
    }
  } catch (error) {
    yield* handleSagaError(error);
  } finally {
    channel.close();
  }
}

function* watchVisitorsSaga(action: ReturnType<typeof actions.subscribeToVisitors>) {
  const bulletinId = action.payload.bulletinId;
  const source = getRealtimeVisitors(bulletinId);
  const channel: EventChannel<Visitor[]> = yield call(createRealTimeChannel, source);

  try {
    while (true) {
      const { message, cancel } = yield race({
        message: take(channel),
        cancel: take(actions.UNSUBSCRIBE_TO_VISITORS),
      });

      if (message && isEndMessage(message)) {
        // Just close the channel, notification is handled by the watchBulletin saga
        channel.close();
      } else if (cancel) channel.close();
      else if (message) yield put(actions.updateVisitors(message));
    }
  } catch (error) {
    yield* handleSagaError(error);
  } finally {
    channel.close();
  }
}

function* deleteBulletinSaga(action: ReturnType<typeof actions.deleteBulletin>) {
  try {
    const bulletinId = action.payload.bulletinId;
    yield call<typeof deleteBulletin>(deleteBulletin, bulletinId);
    yield put(push('/'));
  } catch (error) {
    yield* handleSagaError(error);
  }
}

function* lockBulletinQueueSaga(action: ReturnType<typeof actions.lockBulletinQueue>) {
  try {
    const { bulletinId, isLocked } = action.payload;
    yield call<typeof lockBulletinQueue>(lockBulletinQueue, bulletinId, isLocked);
  } catch (error) {
    yield* handleSagaError(error);
  }
}

export function* bulletinsSaga() {
  yield all([
    takeLatest(actions.GET_BULLETINS_REQUESTED, fetchBulletinsSaga),
    takeLatest(actions.SUBSCRIBE_TO_VISITORS, watchVisitorsSaga),
    takeLatest(actions.SUBSCRIBE_TO_BULLETIN, watchBulletinSaga),
    takeLatest(actions.DELETE_BULLETIN, deleteBulletinSaga),
    takeLatest(actions.LOCK_BULLETIN_QUEUE, lockBulletinQueueSaga),
  ]);
}
