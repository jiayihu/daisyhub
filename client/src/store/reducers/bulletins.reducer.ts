import { GET_BULLETINS_SUCCEEDED, GET_BULLETIN_SUCCEEDED } from '../actions/bulletin.actions';
import { Bulletin } from '../../types/bulletin';
import { Action } from '../actions';

export type BulletinsState = Bulletin[];

export const bulletinsReducer = (state: BulletinsState = [], action: Action): BulletinsState => {
  switch (action.type) {
    case GET_BULLETINS_SUCCEEDED:
      return action.payload;
    case GET_BULLETIN_SUCCEEDED: {
      const bulletin = action.payload;

      return state.filter(x => x.id !== bulletin.id).concat(bulletin);
    }
    default:
      return state;
  }
};
