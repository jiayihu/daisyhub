require('dotenv').config();

import express from 'express';
import { cors, jsonError } from './middlewares';
import { createBulletinsRoutes } from './routers/bulletins.router';
import { db } from './db';
import { createVisitorsRoutes } from './routers/visitors.router';
import { createMessagesRoutes } from './routers/messages.router';
import { createMetricsRoutes } from './routers/metrics.router';
import { createPushSubscriptionsRoutes } from './routers/push-subscription.router';

// Create an Express object and routes (in order)
const app = express();

// CORS
app.use(cors);
app.use(express.json());
app.use(jsonError);

app.use('/bulletins/:bulletinId/visitors', createVisitorsRoutes(db));
app.use('/bulletins/:bulletinId/messages', createMessagesRoutes(db));
app.use('/bulletins/:bulletinId/push-subscriptions', createPushSubscriptionsRoutes(db));
app.use('/bulletins', createBulletinsRoutes(db));
app.use('/metrics', createMetricsRoutes());

exports.app = app;

export { app };
