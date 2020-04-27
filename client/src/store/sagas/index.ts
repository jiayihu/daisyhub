import { takeEvery, all } from 'redux-saga/effects';

import { INIT_BULLETINS } from '../actions/bulletin.actions';

import { onBulletinsInit } from './bulletin.sagas';

export function* watchBulletins() {
  yield all([takeEvery(INIT_BULLETINS, onBulletinsInit)]);
}
