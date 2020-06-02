import React from 'react';
import { BulletinForm } from '../BulletinForm/BulletinForm';
import { addBulletin } from '../../../../store/actions/bulletin.actions';
import { Bulletin } from '../../../../types/bulletin';

import { useDispatch } from 'react-redux';

export const BulletinCreation = () => {
  const dispatch = useDispatch();

  const bulletin: Bulletin = {
    id: '',
    ownerId: '',
    queue: {
      isLocked: false,
    },
    meta: {
      creationDate: '',
    },
    dodo: '',
    island: {
      name: '',
      player: '',
      fruit: 'apple',
      hemisphere: 'north',
      villager: 'neither',
    },
    time: '',
    turnipPrice: 100,
    description: '',
    preferences: {
      concurrent: 4,
      queue: 25,
      hasFee: false,
      isPrivate: false,
    },
  };

  return (
    <BulletinForm
      bulletin={bulletin}
      onSubmit={bulletinBody => {
        dispatch(addBulletin(bulletinBody));
      }}
    />
  );
};
