import express from 'express';
import { getMemoryStats } from '../services/metrics';

export const createMetricsRoutes = () => {
  const router = express.Router({ mergeParams: true });

  router.get('/memory', (_, res) => {
    const stats = getMemoryStats();
    const statsInMB = Object.entries(stats).reduce((acc: any, [key, value]) => {
      acc[key] = Math.round(value / 1024 ** 2);
      return acc;
    }, {});

    return res.send({ status: 'success', data: statsInMB });
  });

  return router;
};
