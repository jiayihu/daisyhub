import React, { useState, useEffect } from 'react';
import './BulletinCreation.scss';
import { Col, Collapse, FormGroup, Label, Spinner, Input, Button } from 'reactstrap';
import { format } from 'date-fns';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addBulletin } from '../../../../store/actions/bulletin.actions';
import { Fruit } from '../../../../types/island';
import { BulletinBody } from '../../../../types/bulletin';

interface ReqBulletin {
  dodoCode: string;
  islandName: string;
  playerName: string;
  fruit: Fruit;
  date: string;
  time: string;
  price: number;
  description: string;
  fees: boolean;
  concurrent: number;
  queue: number;
  isPrivate: boolean;
}

export const BulletinCreation = () => {
  const [isOpenSection, setIsOpenSection] = useState({
    first: true,
    second: false,
    third: false,
  });
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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

  const toggleSection = (section: number) => {
    switch (section) {
      case 1:
        setIsOpenSection({ first: true, second: false, third: false });
        break;
      case 2:
        setIsOpenSection({ first: false, second: true, third: false });
        break;
      case 3:
        setIsOpenSection({ first: false, second: false, third: true });
        break;
      default:
        return 0;
    }
  };

  if (loading) return <Spinner type="grow" />;

  return (
    <Formik<ReqBulletin>
      initialValues={{
        dodoCode: '',
        islandName: '',
        playerName: '',
        fruit: 'apple',
        date: dateTime.date,
        time: dateTime.time,
        price: 100,
        description: '',
        fees: false,
        concurrent: 4,
        queue: 25,
        isPrivate: false,
      }}
      validationSchema={Yup.object({
        dodoCode: Yup.string()
          .length(5, 'Dodo Code must be exactly 5 characters')
          .required('Required'),
        playerName: Yup.string().required('Required'),
        islandName: Yup.string().required('Required'),
        fruit: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
      })}
      onSubmit={fields => {
        const dateTime = new Date(`${fields.date}T${fields.time}`);

        const reqJSON: BulletinBody = {
          dodo: fields.dodoCode,
          island: {
            name: fields.islandName,
            player: fields.playerName,
            fruit: fields.fruit,
            hemisphere: 'north',
            villager: 'neither',
          },
          time: dateTime.toISOString(),
          turnipPrice: fields.price,
          description: fields.description,
          preferences: {
            concurrent: fields.concurrent,
            queue: fields.queue,
            hasFee: fields.fees,
            isPrivate: fields.isPrivate,
          },
        };
        // console.log('sending ', reqJSON);
        dispatch(addBulletin(reqJSON));
      }}
    >
      {props => {
        return (
          <Form className="form">
            <h2 onClick={() => toggleSection(1)} className="h1">
              About your Island
            </h2>
            <Collapse isOpen={isOpenSection.first}>
              <Col>
                <FormGroup>
                  <Label for="dodo" className="h5">
                    Dodo Code
                  </Label>
                  <Input
                    type="text"
                    name="dodoCode"
                    id="dodoCode"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={props.touched.dodoCode && props.errors.dodoCode ? 'error-box' : ''}
                  />
                  <p className="error">
                    <ErrorMessage name="dodoCode" />
                  </p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="islandName" className="h5">
                    Island Name
                  </Label>
                  <Input
                    type="text"
                    name="islandName"
                    id="islandName"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={
                      props.touched.islandName && props.errors.islandName ? 'error-box' : ''
                    }
                  />
                  <p className="error">
                    <ErrorMessage name="islandName" />
                  </p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="playerName" className="h5">
                    Player Name
                  </Label>
                  <Input
                    type="text"
                    name="playerName"
                    id="playerName"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={
                      props.touched.playerName && props.errors.playerName ? 'error-box' : ''
                    }
                  />
                  <p className="error">
                    <ErrorMessage name="playerName" />
                  </p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="description" className="h5">
                    Description and requests
                  </Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    required
                    className={
                      props.touched.description && props.errors.description ? 'error-box' : ''
                    }
                  />
                  <p className="error ">
                    <ErrorMessage name="description" />
                  </p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="fruit" className="h5">
                    Fruit
                  </Label>
                  <Input
                    type="select"
                    name="fruit"
                    value={props.values.fruit}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  >
                    <option value="apple" label="Apples" />
                    <option value="peach" label="Peaches" />
                    <option value="orange" label="Oranges" />
                    <option value="pear" label="Pears" />
                    <option value="cherry" label="Cherries" />
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="date" className="h5">
                    Date
                  </Label>
                  <Input
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
                  <Label for="time" className="h5">
                    Time
                  </Label>
                  <Input
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
            <h2 onClick={() => toggleSection(2)} className="h1">
              About your turnips
            </h2>
            <Collapse isOpen={isOpenSection.second}>
              <Col>
                <FormGroup>
                  <Label for="price" className="h5">
                    Selling price
                  </Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.price}
                    min={0}
                  />
                  {props.touched.price && props.errors.price}
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="fees" className="h5">
                    <Input
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
            <h2 onClick={() => toggleSection(3)} className="h1">
              About your queue
            </h2>
            <Collapse isOpen={isOpenSection.third}>
              <Col>
                <FormGroup>
                  <Label for="concurrent" className="h5">
                    How many people you want in your island (At the same time)
                  </Label>
                  <Input
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
                  <Label for="queue" className="h5">
                    Max queue length
                  </Label>
                  <Input
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
                  <Label for="isPrivate" className="h5">
                    <Input
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
            <Button
              onClick={e => {
                e.preventDefault();
                if (!props.isValid) {
                  toggleSection(1);
                } else {
                  props.submitForm();
                }
              }}
              type="submit"
              color="primary"
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
