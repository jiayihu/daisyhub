import './BulletinVisitor.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  subscribeToBulletin,
  unsubscribeToBulletin,
} from '../../../store/actions/bulletin.actions';
import { getBulletinSelector, getIsUnsubBulletin } from '../../../store/reducers';
import { useRouteMatch } from 'react-router-dom';
import { Spinner, Alert } from 'reactstrap';
import { BulletinDetails } from '../BulletinDetails/BulletinDetails';
import { QueueVisitor } from '../QueueVisitor/QueueVisitor';
import { useSubscription } from '../../../hooks/useSubscription';

function renderAlert() {
  return (
    <Alert color="dark">
      <h3>Lost connection to the island!</h3>
      <p>
        Whoopsie! Try to refresh the page once or twice, if it persists{' '}
        <strong>it has been probably deleted</strong> by the owner.
      </p>
    </Alert>
  );
}

export const BulletinVisitor = () => {
  const match = useRouteMatch<{ bulletinId: string }>();
  const bulletinId = match.params.bulletinId;
  const isUnsubscribed = useSelector(getIsUnsubBulletin);
  const dispatch = useDispatch();
  const bulletin = useSubscription(
    {
      selector: getBulletinSelector,
      subscribe: () => dispatch(subscribeToBulletin(bulletinId)),
      unsubscribe: () => dispatch(unsubscribeToBulletin(bulletinId)),
    },
    [bulletinId, dispatch],
  );

  if (!bulletin) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {isUnsubscribed ? renderAlert() : <Spinner type="grow" />}
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="bulletin-visitor">
          {isUnsubscribed ? renderAlert() : null}
          <BulletinDetails bulletin={bulletin} />
          <QueueVisitor bulletin={bulletin} />
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
