import React, { useEffect, useState } from 'react';
import { Bulletin as BulletinType } from '../../types/bulletin';
import { Spinner } from 'reactstrap';

import { Bulletins } from './Bulletins/Bulletins';

const fetchBullettins = (): Promise<BulletinType[]> => {
  return fetch('http://localhost:3001/bulletins')
    .then((rawRes) => rawRes.json())
    .then((res) => res.data);
};

export const Homepage: React.FC = () => {
  const [bulletins, setBulletins] = useState<BulletinType[]>();

  useEffect(() => {
    fetchBullettins().then((data) => setBulletins(data));
  }, []);

  console.log(bulletins);

  const content = bulletins ? (
    <Bulletins bulletins={bulletins} />
  ) : (
    <Spinner color="primary" />
  );

  return content;
};
