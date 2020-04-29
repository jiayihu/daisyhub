import { combineReducers } from 'redux';
import { bulletinsReducer, BulletinsState } from './bulletins.reducers';
import { Action } from '../actions';

export type AppState = {
  bulletins: BulletinsState;
};

export const reducer = combineReducers<AppState, Action>({
  bulletins: bulletinsReducer,
});

export const getBulletinsSelector = (state: AppState) => state.bulletins;
