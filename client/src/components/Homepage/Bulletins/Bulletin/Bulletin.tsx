import React from 'react';
import { Bulletin as BulletinType } from '../../../../types/bulletin';

export const Bulletin: React.FC<{ bulletin: BulletinType }> = (props) => {
  return <div>{props.bulletin.id}</div>;
};
