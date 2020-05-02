import React, { useState, useEffect } from 'react';
import './BulletinCreation.scss';
import { Col, Collapse, FormGroup, Label, Spinner } from 'reactstrap';
import { format } from 'date-fns';
import { withFormik, FormikProps, Field, Form, FormikErrors } from 'formik';
// import * as Yup from 'yup';

type FormValues = {
  dodoCode: string;
  islandName: string;
  playerName: string;
  fruit: string;
  date: string;
  time: string;
  price: number;
  description: string;
  fees: boolean;
  concurrent: number;
  queue: number;
  isPrivate: boolean;
};

type OtherProps = {
  toggle: (section: number) => void;
  isOpen: { first: boolean; second: boolean; third: boolean };
};

const FirstForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, toggle, isOpen } = props;

  return (
    <Form>
      <h2 onClick={() => toggle(1)}>About your Island</h2>
      <Collapse isOpen={isOpen.first}>
        <Col>
          <FormGroup>
            <Label for="dodo">Dodo Code</Label>
            <Field type="dodoCode" name="dodoCode" />
            {touched.dodoCode && errors.dodoCode}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="islandName">Island Name</Label>
            <Field type="islandName" name="islandName" />
            {touched.islandName && errors.islandName}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="playerName">Player Name</Label>
            <Field type="playerName" name="playerName" />
            {touched.playerName && errors.playerName}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="fruit">Fruit</Label>
            <select name="fruit" value={values.fruit} onChange={handleChange} onBlur={handleBlur}>
              <option value="" label="Choose your native fruit" />
              <option value="apples" label="Apples" />
              <option value="peaches" label="Peaches" />
              <option value="oranges" label="Oranges" />
              <option value="pears" label="Pears" />
              <option value="cherries" label="Cherries" />
            </select>
            {touched.fruit && errors.fruit}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="date">Date</Label>
            <input
              name="date"
              type="date"
              onChange={date => {
                console.log(date.target.value);
                props.setFieldValue('date', date.target.value);
              }}
              onBlur={handleBlur}
              value={values.date}
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
              onBlur={handleBlur}
              value={values.time}
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
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.price}
              min={1}
            />
            {touched.price && errors.price}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="description">Description and requests</Label>
            <input
              type="textarea"
              name="description"
              id="description"
              onChange={handleChange}
              onBlur={handleBlur}
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
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.fees}
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
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.concurrent}
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
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.queue}
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
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.isPrivate}
              />
              Private island
            </Label>
          </FormGroup>
        </Col>
      </Collapse>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

type MyFormProps = {
  initialDodo?: string;
  myDate?: string;
  myTime?: string;
  toggle: (section: number) => void;
  isOpen: { first: boolean; second: boolean; third: boolean };
};

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      dodoCode: props.initialDodo || '',
      islandName: '',
      playerName: '',
      fruit: '',
      date: props.myDate || '',
      time: props.myTime || '',
      price: 100,
      description: '',
      fees: false,
      concurrent: 4,
      queue: 25,
      isPrivate: false,
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.dodoCode) {
      errors.dodoCode = 'Required';
    } else if (values.dodoCode.length !== 5) {
      errors.dodoCode = 'Dodo Code must be exactly 5 characters';
    }
    if (!values.islandName) {
      errors.islandName = 'Required';
    }
    if (!values.playerName) {
      errors.playerName = 'Required';
    }
    if (!values.fruit) {
      errors.fruit = 'Required';
    }
    return errors;
  },

  handleSubmit: values => {
    return console.log(values);
  },
})(FirstForm);

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
    <MyForm myDate={dateTime.date} myTime={dateTime.time} toggle={toggle} isOpen={isOpen} />
  );
};
