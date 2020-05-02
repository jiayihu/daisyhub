import { Bulletin, bulletinToDoc } from './models/bulletin.model';
import faker from 'faker';
import { db } from './db';
import { nanoid } from 'nanoid';

export function createBulletins(quantity: number) {
  const data: Bulletin[] = new Array(quantity).fill(null).map(() => {
    return {
      id: nanoid(),
      ownerId: nanoid(),
      queue: {
        isLocked: false,
      },
      meta: {
        creationDate: faker.date.recent(0).toISOString(),
      },
      dodo: faker.random.alphaNumeric(5),
      island: {
        name: faker.address.city(),
        player: faker.name.firstName(),
        fruit: faker.random.arrayElement(['apple', 'cherry', 'orange', 'peach', 'pear']),
        hemisphere: faker.random.arrayElement(['north', 'south']),
        villager: 'neither',
      },
      time: faker.date.recent(0).toISOString(),
      turnipPrice: faker.random.number(500),
      description: faker.lorem.paragraph(),
      preferences: {
        concurrent: faker.random.number(5),
        queue: faker.random.number(20),
        hasFee: faker.random.boolean(),
        isPrivate: faker.random.boolean(),
      },
    };
  });

  return data;
}

export function createData() {
  Promise.all(
    createBulletins(10).map(bulletin => {
      return db.collection('bulletins').doc(bulletin.id).set(bulletinToDoc(bulletin));
    }),
  ).then(() => {
    console.log('Data generated');
  });
}

createData();
