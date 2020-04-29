import './Bulletins.scss';
import React, { useEffect } from 'react';
import { getBulletins } from '../../../store/actions/bulletin.actions';
import { History } from 'history';
import { Spinner, CardColumns } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBulletinsSelector } from '../../../store/reducers';
import { BulletinPreview } from '../BulletinPreview/BulletinPreview';

type Props = {
  history: History;
};

export const Bulletins = (_: Props) => {
  const bulletins = useSelector(getBulletinsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBulletins());
  }, [dispatch]);

  if (!bulletins.length) return <Spinner />;

  return (
    <CardColumns className="bulletins">
      {bulletins.map(bulletin => (
        <BulletinPreview bulletin={bulletin} />
      ))}
    </CardColumns>
  );
};
