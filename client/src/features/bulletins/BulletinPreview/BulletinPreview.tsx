import React from 'react';
import { Bulletin as BulletinType } from '../../../types/bulletin';
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
} from 'reactstrap';
import { format } from 'date-fns';
import mockImg from './mockImage.png';
import { useHistory } from 'react-router-dom';

type Props = {
  bulletin: BulletinType;
};

export const Bulletin = (props: Props) => {
  const history = useHistory();
  const creationDate = new Date(props.bulletin.meta.creationDate);

  return (
    <Card onClick={() => history.push(`/bulletins/${props.bulletin.id}`)}>
      <CardBody>
        <Container>
          <Row className="border-bottom mb-3 clearfix">
            <Col>
              <CardTitle>
                <small className="text-right d-sm-none d-md-block pb-10">
                  {format(creationDate, 'H:m')}
                </small>
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
              <CardSubtitle className="mt-1">{props.bulletin.island.fruit}</CardSubtitle>
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
  );
};
