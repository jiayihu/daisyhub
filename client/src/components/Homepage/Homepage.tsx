import React, { useEffect, useCallback } from 'react';
import { Bulletin as BulletinType } from '../../types/bulletin';
import { initBulletins } from '../../store/actions/bulletin.actions';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Bulletins } from './Bulletins/Bulletins';

export const Homepage: React.FC = () => {
  const bulletins = useSelector<BulletinType[], BulletinType[]>(
    (state) => state
  );

  const dispatch = useDispatch();

  const onInitBulletins = useCallback(() => dispatch(initBulletins()), [
    dispatch,
  ]);

  useEffect(() => {
    onInitBulletins();
  }, [onInitBulletins]);

  const content = bulletins ? (
    <Bulletins bulletins={bulletins} />
  ) : (
    <Spinner color="primary" />
  );

  return content;
};
