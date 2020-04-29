import { put } from 'redux-saga/effects';

import * as actions from '../actions/bulletin.actions';

const basUrl = 'http://localhost:3001';

export function* onBulletinsInit() {
  try {
    const rawRes = yield fetch(`${basUrl}/bulletins`);
    const response = yield rawRes.json();
    if (response.status !== 'success') {
      yield put(actions.failFetch(response.status));
    } else {
      yield put(actions.setBulletins(response.data));
    }
  } catch (e) {
    yield put(actions.failFetch(e));
  }
}

// export function* onBulletinFetch()
