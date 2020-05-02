import './QueueHost.scss';
import React, { useEffect } from 'react';
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

export type Props = {
  bulletin: Bulletin;
};

export const QueueHost = (props: Props) => {
  const { bulletin } = props;
  const dispatch = useDispatch();
  const visitors = useSelector(getBulletinVisitorsSelector);

  const preferences = bulletin.preferences;
  const isLocked = bulletin.queue.isLocked;

  useEffect(() => {
    dispatch(subscribeToVisitors(bulletin.id));

    return () => {
      dispatch(unsubscribeToVisitors(bulletin.id));
    };
  }, [dispatch, bulletin.id]);

  const orderedVisitors = visitors.sort((a, b) =>
    new Date(a.joinDate) > new Date(b.joinDate) ? 1 : -1,
  );

  return (
    <div className="py-3">
      <h3>Visitors</h3>
      <p className="d-flex justify-content-end">
        {isLocked ? (
          <Button
            color="primary"
            size="sm"
            onClick={() => () => dispatch(lockBulletinQueue(bulletin.id, false))}
          >
            Unlock queue
          </Button>
        ) : (
          <Button
            color="dark"
            size="sm"
            onClick={() => dispatch(lockBulletinQueue(bulletin.id, true))}
          >
            Lock queue
          </Button>
        )}
      </p>
      <Table className="visitors-table" responsive striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderedVisitors.length ? (
            orderedVisitors.map((visitor, index) => (
              <tr key={visitor.id}>
                <td>{visitor.name}</td>
                <td>
                  {index < preferences.concurrent ? (
                    <Badge color="success">Active</Badge>
                  ) : (
                    <Badge color="dark">Waiting</Badge>
                  )}
                </td>
                <td>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => dispatch(removeBulletinVisitor(bulletin.id, visitor.id))}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
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
