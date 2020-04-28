import React from 'react';
import { Bulletin as BulletinType } from '../../../../types/bulletin';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from 'reactstrap';

import mockImg from '../../../../assets/mockImage.png';

export const Bulletin: React.FC<{
  bulletin: BulletinType;
  onclick: Function;
}> = (props) => {
  const card = (
    <Card onClick={() => props.onclick(props.bulletin.id)}>
      <CardBody>
        <Container>
          <Row>
            <Col>
              <CardImg
                style={{ width: '100%', height: '100%' }}
                src={mockImg}
                alt="Bulletin image"
              />
            </Col>
            <Col>
              <CardTitle>{props.bulletin.dodo}</CardTitle>
            </Col>
          </Row>

          <Row className="mt-4 mb-4">
            <CardText>{props.bulletin.description}</CardText>
          </Row>
        </Container>
      </CardBody>
    </Card>
  );

  return card;
};
