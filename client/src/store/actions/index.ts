import { BulletinsAction } from './bulletin.actions';
import { NotificationsAction } from './notifications.actions';
import { VisitorsAction } from './visitors.actions';

export type Action = BulletinsAction | VisitorsAction | NotificationsAction;
