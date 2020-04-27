import express from 'express';
import { cors, jsonError } from './middlewares';
import { createBulletinsRoutes } from './routes/bulletins';
import { db } from './db';
import { createIslandsRoutes } from './routes/islands';

// Create an Express object and routes (in order)
const app = express();

// CORS
app.use(cors);
app.use(express.json());
app.use(jsonError);

app.use('/bulletins', createBulletinsRoutes(db));
app.use('/islands', createIslandsRoutes());

exports.app = app;

export { app };
