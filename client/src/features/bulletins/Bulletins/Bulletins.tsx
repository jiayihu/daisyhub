import './Bulletins.scss';
import React, { useEffect } from 'react';
import { getBulletins } from '../../../store/actions/bulletin.actions';
import { History } from 'history';
import { Spinner, CardColumns, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBulletinsSelector } from '../../../store/reducers';
import { BulletinPreview } from '../BulletinPreview/BulletinPreview';
import { Link } from 'react-router-dom';

type Props = {
  history: History;
};

export const Bulletins = (_: Props) => {
  const bulletins = useSelector(getBulletinsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBulletins());
  }, [dispatch]);

  if (!bulletins) return <Spinner type="grow" />;
  if (!bulletins.length)
    return (
      <Alert color="light">
        <h3>Whoopsie, pretty empty here!</h3>
        There are currently no islands. <Link to="/host">Be the first to sell turnips!</Link>
      </Alert>
    );

  return (
    <CardColumns className="bulletins">
      {bulletins.map(bulletin => (
        <BulletinPreview bulletin={bulletin} key={bulletin.id} />
      ))}
    </CardColumns>
  );
};
