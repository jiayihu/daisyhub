import React, { useEffect, useCallback } from 'react';
import { Bulletin as BulletinType } from '../../types/bulletin';
import { initBulletins } from '../../store/actions/bulletin.actions';
import { RouteComponentProps } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Bulletins } from './Bulletins/BulletinsList';

export const Homepage: React.FC<RouteComponentProps<any>> = (props) => {
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

  const selectedBulletinHandler = (id: string) => {
    props.history.push(`/bulletins/${id}`);
  };

  const content = bulletins ? (
    <Bulletins bulletins={bulletins} onclick={selectedBulletinHandler} />
  ) : (
    <Spinner color="primary" />
  );

  return content;
};
