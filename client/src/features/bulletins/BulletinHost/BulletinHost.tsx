import './BulletinHost.scss';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBulletin } from '../../../store/actions/bulletin.actions';
import { getBulletinSelector } from '../../../store/reducers';
import { useRouteMatch } from 'react-router-dom';
import { Spinner, Button } from 'reactstrap';
import { BulletinDetails } from '../BulletinDetails/BulletinDetails';

export const BulletinHost = () => {
  const match = useRouteMatch<{ bulletinId: string }>();
  const bulletinId = match.params.bulletinId;
  const bulletin = useSelector(getBulletinSelector(bulletinId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBulletin(bulletinId));
  }, [bulletinId, dispatch]);

  if (!bulletin) return <Spinner type="grow" />;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="bulletin-host">
          <BulletinDetails bulletin={bulletin} />
          <p>
            <Button color="light">Edit island</Button>
            <Button color="danger" className="ml-3">
              Delete island
            </Button>
          </p>
          <p className="f6 text-right">
            Image credits:{' '}
            <a
              href="https://dribbble.com/shots/11137115-Turnip"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cherryink
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
