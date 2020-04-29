import React from 'react';
import { Bulletin as BulletinType } from '../../types/bulletin';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  CardSubtitle,
  Spinner,
} from 'reactstrap';

import mockImg from '../../assets/mockImage.png';

export const Bulletin: React.FC<{
  bulletin: BulletinType;
  onclick: Function;
}> = (props) => {
  const [creationDate, creationTime] = props.bulletin.meta.creationDate.split(
    'T'
  );
  let h, m;
  if (creationTime) {
    [h, m] = creationTime.split(':');
  }

  const card = props.bulletin.island.name ? (
    <Card onClick={() => props.onclick(props.bulletin.id)}>
      <CardBody>
        <Container>
          <Row className="border-bottom mb-3 clearfix">
            <Col>
              <CardTitle>
                <small className="text-right d-sm-none d-md-block pb-10">{`${creationDate} ${h}:${m}`}</small>
                <h3 className="text-center text-uppercase font-weight-bold">
                  {props.bulletin.island.name}
                </h3>
                <small className="text-right d-sm-none d-md-block d-xs-block">
                  Created by {props.bulletin.island.player}
                </small>
              </CardTitle>
            </Col>
          </Row>
          <Row>
            <Col>
              <CardImg
                className="border p-2"
                style={{ width: '60%' }}
                src={mockImg}
                alt="Bulletin image"
              />
            </Col>
            <Col className="text-capitalize border p-2">
              <CardSubtitle className="font-weight-bold pt-1">
                {props.bulletin.turnipPrice} Bells
              </CardSubtitle>
              <CardSubtitle className="mt-1">
                {props.bulletin.island.fruit}
              </CardSubtitle>
              <CardSubtitle>{props.bulletin.island.hemisphere}</CardSubtitle>
              <CardSubtitle>{props.bulletin.island.villager}</CardSubtitle>
            </Col>
          </Row>

          <Row className="mt-4 mb-4 border">
            <CardText>{props.bulletin.description}</CardText>
          </Row>
        </Container>
      </CardBody>
    </Card>
  ) : (
    <Spinner />
  );

  return card;
};
