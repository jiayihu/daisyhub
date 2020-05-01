import './BulletinHost.scss';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  subscribeToBulletin,
  unsubscribeToBulletin,
} from '../../../store/actions/bulletin.actions';
import { getBulletinSelector, getIsUnsubBulletin } from '../../../store/reducers';
import { useRouteMatch } from 'react-router-dom';
import { Spinner, Button, Alert } from 'reactstrap';
import { BulletinDetails } from '../BulletinDetails/BulletinDetails';
import { Visitors } from '../Visitors/Visitors';

export const BulletinHost = () => {
  const match = useRouteMatch<{ bulletinId: string }>();
  const bulletinId = match.params.bulletinId;
  const bulletin = useSelector(getBulletinSelector);
  const isUnsubscribed = useSelector(getIsUnsubBulletin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeToBulletin(bulletinId));

    return () => {
      dispatch(unsubscribeToBulletin(bulletinId));
    };
  }, [bulletinId, dispatch]);

  if (isUnsubscribed) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Alert color="dark">
            <h3>Lost connection to the island!</h3>
            <p>
              Whoopsie! The connection to the island has been lost,{' '}
              <strong>it has been probably deleted</strong> by the owner.
            </p>
          </Alert>
        </div>
      </div>
    );
  }

  if (!bulletin) return <Spinner type="grow" />;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="bulletin-host">
          <BulletinDetails bulletin={bulletin} />
          <p className="d-flex justify-content-end">
            <Button color="light">Edit island</Button>
            <Button color="danger" className="ml-3">
              Delete island
            </Button>
          </p>
          <Visitors kind="Host" bulletin={bulletin} />
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
