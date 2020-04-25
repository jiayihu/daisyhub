import { Request, Response } from 'express';
import express from 'express';
import { getIslands, getIsland } from './services/islands';
import { cors } from './middlewares';

// Create an Express object and routes (in order)
const app = express();

// CORS
app.use(cors);

app.get('/islands/:islandId', (req, res) => {
  res.send(getIsland(req.params.islandId));
});
app.get('/islands', (_, res) => {
  res.send(getIslands());
});

exports.app = app;
