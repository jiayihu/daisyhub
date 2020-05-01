import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './App/App';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './store/sagas';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { reducer } from './store/reducers';
import { routerMiddleware } from './store/middlewares/router.middleware';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
firebase.initializeApp(firebaseConfig);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
