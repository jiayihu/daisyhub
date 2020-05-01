import './Visitors.scss';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToVisitors,
  unsubscribeToVisitors,
  lockBulletinQueue,
  removeBulletinVisitor,
} from '../../../store/actions/bulletin.actions';
import { Button, Table, Badge } from 'reactstrap';
import { getBulletinVisitorsSelector } from '../../../store/reducers';
import { Bulletin } from '../../../types/bulletin';
import { Visitor } from '../../../types/visitor';

export type Props =
  | {
      kind: 'Host';
      bulletin: Bulletin;
    }
  | {
      kind: 'Visitor';
      bulletin: Bulletin;
    };

export const Visitors = (props: Props) => {
  const { kind, bulletin } = props;
  const dispatch = useDispatch();
  const visitors = useSelector(getBulletinVisitorsSelector);

  const preferences = bulletin.preferences;
  const isLocked = bulletin.queue.isLocked;
  const handleLock = useCallback(() => dispatch(lockBulletinQueue(bulletin.id, true)), [
    dispatch,
    bulletin.id,
  ]);
  const handleUnlock = useCallback(() => dispatch(lockBulletinQueue(bulletin.id, false)), [
    dispatch,
    bulletin.id,
  ]);

  useEffect(() => {
    dispatch(subscribeToVisitors(bulletin.id));

    return () => {
      dispatch(unsubscribeToVisitors(bulletin.id));
    };
  }, [dispatch, bulletin.id]);

  function renderToolbar() {
    return (
      <p className="d-flex justify-content-end">
        {isLocked ? (
          <Button color="primary" size="sm" onClick={handleUnlock}>
            Unlock queue
          </Button>
        ) : (
          <Button color="dark" size="sm" onClick={handleLock}>
            Lock queue
          </Button>
        )}
      </p>
    );
  }

  const orderedVisitors = visitors.sort((a, b) =>
    new Date(a.joinDate) > new Date(b.joinDate) ? 1 : -1,
  );

  function renderVisitors(visitors: Visitor[]) {
    return visitors.map((visitor, index) => (
      <tr key={visitor.id}>
        <td>{visitor.name}</td>
        <td>
          {index < preferences.concurrent ? (
            <Badge color="success">Active</Badge>
          ) : (
            <Badge color="dark">Waiting</Badge>
          )}
        </td>
        {kind === 'Host' ? (
          <td>
            <Button
              color="danger"
              size="sm"
              onClick={() => dispatch(removeBulletinVisitor(bulletin.id, visitor.id))}
            >
              Remove
            </Button>
          </td>
        ) : null}
      </tr>
    ));
  }

  return (
    <div className="py-3">
      <h3>Visitors</h3>
      {kind === 'Host' ? renderToolbar() : null}
      <Table className="visitors-table" responsive striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            {kind === 'Host' ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {orderedVisitors.length ? (
            renderVisitors(orderedVisitors)
          ) : (
            <tr>
              <td colSpan={3}>There are currently no visitors.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
