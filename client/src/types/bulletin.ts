import { Island } from './island';

export type BulletinBody = Exclude<Bulletin, 'id' | 'meta'>;

export interface Bulletin {
  id: string;
  dodo: string;

  island: Island;

  time: string;
  turnipPrice: number;
  description: string;

  preferences: {
    concurrent: number;
    queue: number;
    hasFee: boolean;
    isPrivate: boolean;
  };
  meta: {
    creationDate: string;
  };
}
