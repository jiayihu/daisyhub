import './QueueVisitor.scss';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToVisitors,
  unsubscribeToVisitors,
  removeBulletinVisitor,
  addBulletinVisitor,
  setBulletinVisitorId,
} from '../../../store/actions/bulletin.actions';
import { Button, Table, Badge, Form, Input, FormGroup, Alert } from 'reactstrap';
import { getBulletinVisitorsSelector, getBulletinVisitorIdSelector } from '../../../store/reducers';
import { Bulletin } from '../../../types/bulletin';
import { readVisitorId } from '../../../services/bulletin-history.service';
import { useSubscription } from '../../../hooks/useSubscription';

export type Props = {
  bulletin: Bulletin;
};

export const QueueVisitor = (props: Props) => {
  const { bulletin } = props;
  const dispatch = useDispatch();
  const visitors = useSubscription(
    {
      selector: getBulletinVisitorsSelector,
      subscribe: () => dispatch(subscribeToVisitors(bulletin.id)),
      unsubscribe: () => dispatch(unsubscribeToVisitors(bulletin.id)),
    },
    [dispatch, bulletin.id],
  );

  const preferences = bulletin.preferences;

  const [visitorName, setVisitorName] = useState('');
  const visitorId = useSelector(getBulletinVisitorIdSelector);
  const isActiveVisitor = visitorId && visitors.find(x => x.id === visitorId) !== undefined;

  useEffect(() => {
    const id = readVisitorId(bulletin.id);
    if (id) dispatch(setBulletinVisitorId(id));
  }, [dispatch, bulletin.id]);

  const orderedVisitors = [...visitors].sort((a, b) =>
    new Date(a.joinDate) > new Date(b.joinDate) ? 1 : -1,
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      dispatch(addBulletinVisitor(bulletin.id, visitorName));
    },
    [visitorName, bulletin.id, dispatch],
  );

  function renderToolbar() {
    if (bulletin.queue.isLocked)
      return (
        <Alert color="warning" className="mb-0">
          The host has locked the queue
        </Alert>
      );
    if (visitorId) {
      return (
        <Button
          color="dark"
          size="sm"
          onClick={() => dispatch(removeBulletinVisitor(bulletin.id, visitorId))}
        >
          Leave queue
        </Button>
      );
    }

    return (
      <Form inline onSubmit={handleSubmit}>
        <FormGroup className="mx-3">
          <Input
            type="text"
            className="form-control"
            required
            value={visitorName}
            onChange={event => setVisitorName(event.target.value)}
            placeholder="Your name in the game"
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Join queue
        </Button>
      </Form>
    );
  }

  return (
    <div className="py-3">
      <h3>Visitors</h3>
      <div className="d-flex justify-content-end my-3">{renderToolbar()}</div>
      <Table className="visitors-table" responsive striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
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
                  {visitorId === visitor.id ? (
                    <Badge color="dark" className="ml-1">
                      You
                    </Badge>
                  ) : null}
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
      {isActiveVisitor ? (
        <Alert color="success">
          The DODO code is <strong>{bulletin.dodo.toUpperCase()}</strong>. Please remember to leave
          the queue after leaving the island, to allow other people waiting on the queue.
        </Alert>
      ) : null}
    </div>
  );
};
