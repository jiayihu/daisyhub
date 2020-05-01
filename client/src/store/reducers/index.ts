import { combineReducers } from 'redux';
import { bulletinsReducer, BulletinsState } from './bulletins.reducer';
import { Action } from '../actions';
import { NotificationsState, notificationsReducer } from './notifications.reducer';
import { BulletinState, bulletinReducer } from './bulletin.reducer';

export type AppState = {
  bulletins: BulletinsState;
  bulletin: BulletinState;
  notifications: NotificationsState;
};

export const reducer = combineReducers<AppState, Action>({
  bulletins: bulletinsReducer,
  bulletin: bulletinReducer,
  notifications: notificationsReducer,
});

export const getBulletinsSelector = (state: AppState) => state.bulletins;

export const getStaticBulletinSelector = (bulletinId: string) => (state: AppState) =>
  state.bulletins.find(bulletin => bulletin.id === bulletinId);

export const getBulletinSelector = (state: AppState) => state.bulletin.bulletin;

export const getIsUnsubBulletin = (state: AppState) => state.bulletin.isUnsubscribed;

export const getBulletinVisitorsSelector = (state: AppState) => state.bulletin.visitors;

export const getNotificationsSelector = (state: AppState) => state.notifications;
