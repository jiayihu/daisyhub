import React from 'react';
import { Bulletin } from './Bulletin/Bulletin';
import { Bulletin as BulletinType } from '../../../types/bulletin';

export const Bulletins: React.FC<{ bulletins: BulletinType[] }> = (props) => {
  const content = props.bulletins.map((res) => (
    <Bulletin bulletin={res} key={res.id} />
  ));
  return <div>{content}</div>;
};
