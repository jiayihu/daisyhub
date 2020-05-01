export type Fruit = 'apple' | 'cherry' | 'orange' | 'peach' | 'pear';

export interface Island {
  name: string;
  player: string;
  fruit: Fruit;
  hemisphere: 'north' | 'south';
  villager: 'daisy' | 'celeste' | 'neither';
}
