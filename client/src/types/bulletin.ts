import { Island } from './island';

export type BulletinBody = Omit<Bulletin, 'id' | 'meta' | 'queue'>;

export interface Bulletin {
  id: string;
  queue: {
    isLocked: boolean;
  };
  meta: {
    creationDate: string;
  };
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
}
