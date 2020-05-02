import React, { useState, useEffect } from 'react';
import './BulletinCreation.scss';
import { Container, Form, Col, FormGroup, Label, Input, Button, Collapse, Row } from 'reactstrap';
import { format } from 'date-fns';

export const BulletinCreation = () => {
  const [isOpen, setIsOpen] = useState({
    first: true,
    second: false,
    third: false,
  });

  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  const initDateTime = () => {
    const today = new Date();
    console.log('momo');
    const date = format(today, 'yyyy-MM-dd');
    const time = format(today, 'HH:mm');
    setDateTime({ date, time });
  };

  useEffect(() => {
    if (isOpen.first === true) {
      initDateTime();
    }
  }, [isOpen.first]);

  const toggle = (n: number) => {
    switch (n) {
      case 1:
        setIsOpen({ first: true, second: false, third: false });
        break;
      case 2:
        setIsOpen({ first: false, second: true, third: false });
        break;
      case 3:
        setIsOpen({ first: false, second: false, third: true });
        break;
      default:
        return 0;
    }
  };

  return (
    <Container style={{ backgroundColor: 'white' }}>
      <Form>
        <h2 onClick={() => toggle(1)}>About your Island</h2>
        <Collapse isOpen={isOpen.first}>
          <Col>
            <FormGroup>
              <Label for="dodo">Dodo Code</Label>
              <Input type="text" name="dodoCode" id="dodoCode" placeholder="000000" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Island Name</Label>
              <Input type="text" name="name" id="islandName" placeholder="islandName" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="player">Player Name</Label>
              <Input type="text" name="player" id="playerName" placeholder="playerName" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="fruit">Fruit</Label>
              <Input type="select" name="fruit" id="fruit">
                <option>Apples</option>
                <option>Oranges</option>
                <option>Cherries</option>
                <option>Pears</option>
                <option>Peaches</option>
              </Input>
            </FormGroup>
          </Col>
          <Label for="datetime">Date Time</Label>
          <Row>
            <Col>
              <FormGroup>
                <Input type="date" name="date" id="date" defaultValue={dateTime.date} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input type="time" name="time" id="time" defaultValue={dateTime.time} />
              </FormGroup>
            </Col>
          </Row>
        </Collapse>
        <h2 onClick={() => toggle(2)}>About the Turnips</h2>
        <Collapse isOpen={isOpen.second}>
          <Col>
            <FormGroup>
              <Label for="price">Selling price</Label>
              <Input type="number" name="price" id="price" defaultValue="100" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="description">Description and requests</Label>
              <Input type="textarea" name="description" id="description" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="fees">
                <Input type="checkbox" />
                Entry fees
              </Label>
            </FormGroup>
          </Col>
        </Collapse>
        <h2 onClick={() => toggle(3)}>Queue management</h2>
        <Collapse isOpen={isOpen.third}>
          <Col>
            <FormGroup>
              <Label for="concurrent">
                How many people you want in your island (At the same time)
              </Label>
              <Input type="number" name="concurrent" id="concurrent" defaultValue={5} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="queue">Max queue length</Label>
              <Input type="number" name="queue" id="queue" defaultValue={25} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="isPrivate">
                <Input type="checkbox" />
                Private island
              </Label>
            </FormGroup>
          </Col>
        </Collapse>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
};
