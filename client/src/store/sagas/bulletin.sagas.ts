import { put } from 'redux-saga/effects';

import * as actions from '../actions/bulletin.actions';

const basUrl = 'http://localhost:3001';

export function* onBulletinsInit() {
  try {
    const rawRes = yield fetch(`${basUrl}/bulletins`);
    const response = yield rawRes.json();
    console.log(response);
    if (response.status !== 'success') {
      throw new Error(response.status);
    } else {
      yield put({
        type: actions.SET_BULLETINS,
        payload: response.data,
      });
    }
  } catch (e) {
    yield put({
      type: actions.FAIL_FETCH,
      error: e,
    });
  }
}
