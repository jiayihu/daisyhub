import { combineReducers } from 'redux';
import { bulletinsReducer, BulletinsState } from './bulletins.reducers';
import { Action } from '../actions';
import { NotificationsState, notificationsReducer } from './notifications.reducers';

export type AppState = {
  bulletins: BulletinsState;
  notifications: NotificationsState;
};

export const reducer = combineReducers<AppState, Action>({
  bulletins: bulletinsReducer,
  notifications: notificationsReducer,
});

export const getBulletinsSelector = (state: AppState) => state.bulletins;
export const getBulletinSelector = (bulletinId: string) => (state: AppState) =>
  state.bulletins.find(bulletin => bulletin.id === bulletinId);

export const getNotificationsSelector = (state: AppState) => state.notifications;
