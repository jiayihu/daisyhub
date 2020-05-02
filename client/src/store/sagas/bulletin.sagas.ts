import { all, call, take, takeLatest, race, select } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/bulletin.actions';
import {
  getBulletins,
  getRealtimeBulletin,
  deleteBulletin,
  lockBulletinQueue,
} from '../../services/bulletins.service';
import { handleSagaError } from './handleSagaError';
import { EventChannel } from 'redux-saga';
import { Bulletin } from '../../types/bulletin';
import { selectStaticBulletin } from '../reducers';
import { push } from '../middlewares/router.middleware';
import { isEndMessage, createRealTimeChannel } from './realtime-channel';

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
  const bulletin = yield select(selectStaticBulletin(bulletinId));
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
    takeLatest(actions.SUBSCRIBE_TO_BULLETIN, watchBulletinSaga),
    takeLatest(actions.DELETE_BULLETIN, deleteBulletinSaga),
    takeLatest(actions.LOCK_BULLETIN_QUEUE, lockBulletinQueueSaga),
  ]);
}
