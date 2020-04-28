import React from 'react';
import { Bulletin } from './Bulletin/Bulletin';
import { Bulletin as BulletinType } from '../../../types/bulletin';
import { Container, Row, Col } from 'reactstrap';

export const Bulletins: React.FC<{
  bulletins: BulletinType[];
  onclick: Function;
}> = (props) => {
  const bulletinsGrid = (
    <Row>
      {props.bulletins.map((bulletin) => (
        <Col xs="auto" sm="6" className="mb-2 mt-4" key={bulletin.id}>
          <Bulletin bulletin={bulletin} onclick={props.onclick} />
        </Col>
      ))}
    </Row>
  );
  return <Container>{bulletinsGrid}</Container>;
};
