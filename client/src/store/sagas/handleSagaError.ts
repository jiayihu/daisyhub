import { all, put } from 'redux-saga/effects';
import { isRestError } from '../../types/rest-error';
import { addNotification } from '../actions/notifications.actions';

export function* handleSagaError(error: any) {
  if (isRestError(error) && error.details) {
    yield all(
      error.details.map(detail =>
        put(
          addNotification({
            message: detail.message,
            type: 'danger',
          }),
        ),
      ),
    );
  }

  yield put(addNotification({ message: error.message, type: 'danger' }));
}
