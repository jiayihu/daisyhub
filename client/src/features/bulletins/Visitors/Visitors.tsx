import './Visitors.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToVisitors,
  unsubscribeToVisitors,
} from '../../../store/actions/bulletin.actions';
import { Button, Table, Badge } from 'reactstrap';
import { getBulletinVisitorsSelector } from '../../../store/reducers';
import { Bulletin } from '../../../types/bulletin';

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

  useEffect(() => {
    dispatch(subscribeToVisitors(bulletin.id));

    return () => {
      dispatch(unsubscribeToVisitors(bulletin.id));
    };
  }, [dispatch, bulletin.id]);

  function renderToolbar() {
    return (
      <p className="d-flex justify-content-end">
        <Button color="dark" size="sm">
          Lock queue
        </Button>
      </p>
    );
  }

  const orderedVisitors = visitors.sort((a, b) =>
    new Date(a.joinDate) > new Date(b.joinDate) ? 1 : -1,
  );

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
          {orderedVisitors.map(visitor => (
            <tr key={visitor.id}>
              <td>{visitor.name}</td>
              <td>
                <Badge color="dark">Waiting</Badge>
              </td>
              {kind === 'Host' ? (
                <td>
                  <Button color="danger" size="sm">
                    Remove
                  </Button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
