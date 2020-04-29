import { all } from 'redux-saga/effects';
import { bulletinsSaga } from './bulletin.sagas';

export function* rootSaga() {
  yield all([bulletinsSaga()]);
}
