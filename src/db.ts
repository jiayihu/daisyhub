import { Firestore } from '@google-cloud/firestore';

require('dotenv').config();

export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.CREDENTIALS_PATH,
});
