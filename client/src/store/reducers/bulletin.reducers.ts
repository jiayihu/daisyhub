import {
  BulletinsActionTypes,
  FailFetchBulletinsActionType,
  SetBulletinsActionType,
  SET_BULLETINS,
  FAIL_FETCH,
} from '../actions/bulletin.actions';

import { Bulletin as BulletinType } from '../../types/bulletin';

const initialState: BulletinType[] = [
  {
    id: '',
    dodo: '',
    island: {
      fruit: '',
      hemisphere: '',
      villager: '',
    },
    time: '',
    turnipPrice: 0,
    description: '',
    preferences: {
      concurrent: 0,
      queue: 0,
      hasFee: false,
      isPrivate: false,
    },
    meta: {
      creationDate: '',
    },
  },
];

const setBulletins = (
  state: BulletinType[],
  action: SetBulletinsActionType
) => {
  console.log(state[0].id);
  return action.payload;
};

const failFetch = (state: any, action: FailFetchBulletinsActionType) => {
  console.log('FAIL');
  console.log(state);
  console.log(action.error);
  return state;
};

export const reducer = (state = initialState, action: BulletinsActionTypes) => {
  switch (action.type) {
    case SET_BULLETINS:
      return setBulletins(state, action);
    case FAIL_FETCH:
      return failFetch(state, action);
    default:
      return state;
  }
};
