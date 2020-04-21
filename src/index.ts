import { Request, Response } from 'express';
import express from 'express';
import { getIslands, getIsland } from './services/islands';

// Create an Express object and routes (in order)
const app = express();

app.get('/:islandId', (req, res) => {
  res.send(getIsland(req.params.islandId));
});
app.get('/', (_, res) => {
  res.send(getIslands());
});

exports.islands = app;
