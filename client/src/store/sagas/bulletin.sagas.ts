import { all, takeEvery, call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/bulletin.actions';
import { getBulletins } from '../../services/bulletins.service';

function* fetchBulletins() {
  try {
    const bulletins = yield call<typeof getBulletins>(getBulletins);

    yield put(actions.getBulletinsSucceeded(bulletins));
  } catch (error) {
    yield put(actions.getBulletinsFailed(error));
  }
}

// export function* onBulletinFetch()

export function* bulletinsSaga() {
  yield all([takeEvery(actions.GET_BULLETINS_REQUESTED, fetchBulletins)]);
}
