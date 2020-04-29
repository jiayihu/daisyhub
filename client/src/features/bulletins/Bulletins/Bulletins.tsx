import React, { useEffect } from 'react';
import { getBulletins } from '../../../store/actions/bulletin.actions';
import { History } from 'history';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getBulletinsSelector } from '../../../store/reducers';
import { Bulletin } from '../BulletinPreview/BulletinPreview';

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
    <Container>
      <Row>
        {bulletins.map((bulletin) => (
          <Col xs="auto" sm="6" className="mb-2 mt-4" key={bulletin.id}>
            <Bulletin bulletin={bulletin} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
