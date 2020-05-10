import * as D from 'io-ts/lib/Decoder';

export const Island = D.type({
  name: D.string,
  player: D.string,
  fruit: D.literal('apple', 'cherry', 'orange', 'peach', 'pear'),
  hemisphere: D.literal('north', 'south'),
  villager: D.literal('daisy', 'celeste', 'neither'),
});

export type Island = D.TypeOf<typeof Island>;
