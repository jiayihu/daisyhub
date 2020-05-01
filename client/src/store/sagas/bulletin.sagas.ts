import { all, call, take, takeLatest, race, select } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/bulletin.actions';
import {
  getBulletins,
  getRealtimeVisitors,
  getRealtimeBulletin,
} from '../../services/bulletins.service';
import { handleSagaError } from './handleSagaError';
import { EventSource } from '../../services/real-time';
import { eventChannel, EventChannel, END } from 'redux-saga';
import { Visitor } from '../../types/visitor';
import { Bulletin } from '../../types/bulletin';
import { getStaticBulletinSelector } from '../reducers';
import { addNotification } from '../actions/notifications.actions';

function createRealTimeChannel<T>(source: EventSource<T>) {
  return eventChannel<T>(emit => {
    source.subscribe(docs => {
      docs ? emit(docs) : emit(END);
    });

    return () => source.unsubscribe();
  });
}

function* fetchBulletins() {
  try {
    const bulletins = yield call<typeof getBulletins>(getBulletins);

    yield put(actions.getBulletinsSucceeded(bulletins));
  } catch (error) {
    yield* handleSagaError(error);
  }
}

function* watchBulletin(action: ReturnType<typeof actions.getBulletin>) {
  const bulletinId = action.payload.bulletinId;
  const source = getRealtimeBulletin(bulletinId);

  try {
    // Try to retrieve a static version from the list
    const bulletin = yield select(getStaticBulletinSelector(bulletinId));
    if (bulletin) yield put(actions.updateBulletin(bulletin));

    // Start real-time updates
    const channel: EventChannel<Bulletin> = yield call(createRealTimeChannel, source);

    while (true) {
      const { bulletin, cancel } = yield race({
        bulletin: take(channel),
        cancel: take(actions.UNSUBSCRIBE_TO_BULLETIN),
      });

      if (bulletin) yield put(actions.updateBulletin(bulletin));
      else if (cancel) channel.close();
    }
  } catch (error) {
    source.unsubscribe();
    yield* handleSagaError(error);
  } finally {
    yield put(
      addNotification({
        message: `Whopsie! This island doesn't exist anymore.`,
        type: 'danger',
      }),
    );
  }
}

function* watchVisitors(action: ReturnType<typeof actions.subscribeToVisitors>) {
  const bulletinId = action.payload.bulletinId;
  const source = getRealtimeVisitors(bulletinId);

  try {
    const channel: EventChannel<Visitor[]> = yield call(createRealTimeChannel, source);

    while (true) {
      const { visitors, cancel } = yield race({
        visitors: take(channel),
        cancel: take(actions.UNSUBSCRIBE_TO_VISITORS),
      });

      if (visitors) yield put(actions.updateVisitors(visitors));
      else if (cancel) channel.close();
    }
  } catch (error) {
    source.unsubscribe();
    yield* handleSagaError(error);
  } finally {
    yield put(
      addNotification({
        message: `Whopsie! This island doesn't exist anymore.`,
        type: 'danger',
      }),
    );
  }
}

// export function* onBulletinFetch()

export function* bulletinsSaga() {
  yield all([
    takeLatest(actions.GET_BULLETINS_REQUESTED, fetchBulletins),
    takeLatest(actions.GET_BULLETIN_REQUESTED, watchBulletin),
    takeLatest(actions.SUBSCRIBE_TO_VISITORS, watchVisitors),
    takeLatest(actions.SUBSCRIBE_TO_BULLETIN, watchBulletin),
  ]);
}
