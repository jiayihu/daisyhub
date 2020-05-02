import React, { useState, useEffect } from 'react';
import './BulletinCreation.scss';
import { Col, Collapse, FormGroup, Label, Spinner } from 'reactstrap';
import { format } from 'date-fns';
import { Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';

export const BulletinCreation = () => {
  const [isOpen, setIsOpen] = useState({
    first: true,
    second: false,
    third: false,
  });

  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [loading, setLoading] = useState(true);

  const initDateTime = () => {
    const today = new Date();
    const date = format(today, 'yyyy-MM-dd');
    const time = format(today, 'HH:mm');
    setDateTime({ date, time });
  };

  useEffect(() => {
    initDateTime();
    setLoading(false);
  }, []);

  const toggle = (section: number) => {
    switch (section) {
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

  return loading ? (
    <Spinner type="grow" />
  ) : (
    <Formik
      initialValues={{
        dodoCode: '',
        islandName: '',
        playerName: '',
        fruit: '',
        date: dateTime.date,
        time: dateTime.time,
        price: 100,
        description: '',
        fees: false,
        concurrent: 4,
        queue: 25,
        isPrivate: false,
      }}
      onSubmit={fields => {
        alert('Success  ' + JSON.stringify(fields, null, 4));
      }}
    >
      {props => {
        return (
          <Form>
            <h2 onClick={() => toggle(1)}>About your Island</h2>
            <Collapse isOpen={isOpen.first}>
              <Col>
                <FormGroup>
                  <Label for="dodo">Dodo Code</Label>
                  <Field type="dodoCode" name="dodoCode" />
                  {props.touched.dodoCode && props.errors.dodoCode}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="islandName">Island Name</Label>
                  <Field type="islandName" name="islandName" />
                  {props.touched.islandName && props.errors.islandName}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="playerName">Player Name</Label>
                  <Field type="playerName" name="playerName" />
                  {props.touched.playerName && props.errors.playerName}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="fruit">Fruit</Label>
                  <select
                    name="fruit"
                    value={props.values.fruit}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  >
                    <option value="" label="Choose your native fruit" />
                    <option value="apples" label="Apples" />
                    <option value="peaches" label="Peaches" />
                    <option value="oranges" label="Oranges" />
                    <option value="pears" label="Pears" />
                    <option value="cherries" label="Cherries" />
                  </select>
                  {props.touched.fruit && props.errors.fruit}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <input
                    name="date"
                    type="date"
                    onChange={date => {
                      props.setFieldValue('date', date.target.value);
                    }}
                    onBlur={props.handleBlur}
                    value={props.values.date}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="time">Time</Label>
                  <input
                    name="time"
                    type="time"
                    onChange={time => {
                      props.setFieldValue('time', time.target.value);
                    }}
                    onBlur={props.handleBlur}
                    value={props.values.time}
                  />
                </FormGroup>
              </Col>
            </Collapse>
            <h2 onClick={() => toggle(2)}>About your turnips</h2>
            <Collapse isOpen={isOpen.second}>
              <Col>
                <FormGroup>
                  <Label for="price">Selling price</Label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.price}
                    min={1}
                  />
                  {props.touched.price && props.errors.price}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="description">Description and requests</Label>
                  <input
                    type="textarea"
                    name="description"
                    id="description"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="fees">
                    <input
                      type="checkbox"
                      name="fees"
                      id="fees"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      checked={props.values.fees}
                    />
                    Entry fees
                  </Label>
                </FormGroup>
              </Col>
            </Collapse>
            <h2 onClick={() => toggle(3)}>About your queue</h2>

            <Collapse isOpen={isOpen.third}>
              <Col>
                <FormGroup>
                  <Label for="concurrent">
                    How many people you want in your island (At the same time)
                  </Label>
                  <input
                    type="number"
                    name="concurrent"
                    id="concurrent"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.concurrent}
                    min={1}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="queue">Max queue length</Label>
                  <input
                    type="number"
                    name="queue"
                    id="queue"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.queue}
                    min={5}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="isPrivate">
                    <input
                      type="checkbox"
                      name="isPrivate"
                      id="isPrivate"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      checked={props.values.isPrivate}
                    />
                    Private island
                  </Label>
                </FormGroup>
              </Col>
            </Collapse>

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};
