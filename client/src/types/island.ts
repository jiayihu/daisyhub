export interface Island {
  name: string;
  player: string;
  fruit: 'apple' | 'cherry' | 'orange' | 'peach' | 'pear' | '';
  hemisphere: 'north' | 'south' | '';
  villager: 'daisy' | 'celeste' | 'neither';
}
