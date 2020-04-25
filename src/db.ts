import { Firestore } from '@google-cloud/firestore';

require('dotenv').config();

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.CREDENTIALS_PATH,
});

db.collection('users')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
