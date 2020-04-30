import { all, call, takeLatest } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/bulletin.actions';
import { getBulletins, getBulletin } from '../../services/bulletins.service';
import { handleSagaError } from './handleSagaError';

function* fetchBulletins() {
  try {
    const bulletins = yield call<typeof getBulletins>(getBulletins);

    yield put(actions.getBulletinsSucceeded(bulletins));
  } catch (error) {
    yield* handleSagaError(error);
  }
}

function* fetchBulletin(action: ReturnType<typeof actions.getBulletin>) {
  try {
    const bulletin = yield call<typeof getBulletin>(getBulletin, action.payload.bulletinId);

    yield put(actions.getBulletinSucceeded(bulletin));
  } catch (error) {
    yield* handleSagaError(error);
  }
}

// export function* onBulletinFetch()

export function* bulletinsSaga() {
  yield all([
    takeLatest(actions.GET_BULLETINS_REQUESTED, fetchBulletins),
    takeLatest(actions.GET_BULLETIN_REQUESTED, fetchBulletin),
  ]);
}
