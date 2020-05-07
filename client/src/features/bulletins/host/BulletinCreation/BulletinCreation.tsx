import React, { useState, useEffect } from 'react';
import { Col, Collapse, FormGroup, Label, Spinner, Button } from 'reactstrap';
import { format } from 'date-fns';
import { Form, Formik, Field, FieldProps } from 'formik';
import { string, object, number, ref } from 'yup';
import { useDispatch } from 'react-redux';
import { addBulletin } from '../../../../store/actions/bulletin.actions';
import { Fruit, Villager } from '../../../../types/island';
import { BulletinBody } from '../../../../types/bulletin';

import {
  TextInputComponent,
  TextAreaInputComponent,
  NumberInputComponent,
} from './CustomInputComponent/CustomInputComponent';

enum sections {
  FIRST = 'first',
  SECOND = 'second',
}

export const BulletinCreation = () => {
  const [isOpenSection, setIsOpenSection] = useState(sections.FIRST);
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

  const labelClass = 'h5';

  if (loading) return <Spinner type="grow" />;

  return (
    <Formik
      initialValues={{
        dodo: '',
        island: {
          name: '',
          player: '',
          fruit: 'apple' as Fruit,
          villager: 'neither' as Villager,
          hemisphere: 'north' as 'north' | 'south',
        },
        turnipPrice: 100,
        description: '',
        date: dateTime.date,
        time: dateTime.time,
        preferences: {
          concurrent: 4,
          queue: 25,
          hasFee: false,
          isPrivate: false,
        },
      }}
      validationSchema={object({
        dodo: string()
          .length(5, 'Dodo Code must be exactly 5 characters')
          .required('DODO Code is required'),
        island: object({
          player: string().required('Player name is required'),
          name: string().required('Island name is required'),
        }),
        turnipPrice: number().min(0, "The price can't be lower than 0 ").max(999, 'Price too high'),
        description: string().required('A description is required'),
        preferences: object({
          queue: number()
            .min(1, "Queue can't be lower than 1")
            .min(
              ref('concurrent'),
              "You can't have less people in your queue than the concurrent ones",
            ),
          concurrent: number()
            .min(1, 'You need to have at least 1 person in your island')
            .max(ref('queue'), 'You cannot exceed your queue limits '),
        }),
      })}
      onSubmit={fields => {
        const bulletinBody: BulletinBody = { ...fields };

        bulletinBody.time = new Date(fields.date + 'T' + fields.time).toISOString();
        dispatch(addBulletin(bulletinBody));
      }}
    >
      {formikProps => {
        return (
          <Form>
            <h2 onClick={() => setIsOpenSection(sections.FIRST)} className="h1">
              Essential informations
            </h2>
            <Collapse isOpen={isOpenSection === sections.FIRST}>
              <Col>
                <FormGroup>
                  <Label className={labelClass}>
                    DODO Code
                    <Field name="dodo" component={TextInputComponent} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label className={labelClass}>
                    Island Name
                    <Field name="island.name" component={TextInputComponent} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label className={labelClass}>
                    Player Name
                    <Field name="island.player" component={TextInputComponent} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label className={labelClass}>
                    Description and requests
                    <Field name="description" component={TextAreaInputComponent} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="fruit" className={labelClass}>
                    Fruit
                    <Field
                      as="select"
                      name="island.fruit"
                      value={formikProps.values.island.fruit}
                      className="form-control"
                    >
                      <option value="apple" label="Apples" />
                      <option value="peach" label="Peaches" />
                      <option value="orange" label="Oranges" />
                      <option value="pear" label="Pears" />
                      <option value="cherry" label="Cherries" />
                    </Field>
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="price" className={labelClass}>
                    Selling price
                    <Field name="turnipPrice" component={NumberInputComponent} min={0} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="fees" className={labelClass}>
                    Entry fees
                    <Field name="preferences.hasFee">
                      {({ field }: FieldProps) => {
                        return (
                          <div>
                            <input type="checkbox" {...field} />
                          </div>
                        );
                      }}
                    </Field>
                  </Label>
                </FormGroup>
              </Col>
            </Collapse>
            <h2 onClick={() => setIsOpenSection(sections.SECOND)} className="h1">
              Advanced Options
            </h2>
            <Collapse isOpen={isOpenSection === sections.SECOND}>
              <Col>
                <FormGroup>
                  <Label for="date" className={labelClass}>
                    Date
                  </Label>
                  <Field name="date">
                    {({ field }: FieldProps) => {
                      return (
                        <div>
                          <input type="date" className="form-control" {...field} />
                        </div>
                      );
                    }}
                  </Field>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="time" className={labelClass}>
                    Time
                  </Label>
                  <Field name="time">
                    {({ field }: FieldProps) => {
                      return (
                        <div>
                          <input type="time" className="form-control" {...field} />
                        </div>
                      );
                    }}
                  </Field>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="concurrent" className={labelClass}>
                    How many people you want in your island (at the same time)
                  </Label>
                  <Field name="preferences.concurrent" component={NumberInputComponent} min={1} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="queue" className={labelClass}>
                    Max queue length
                  </Label>
                  <Field name="preferences.queue" component={NumberInputComponent} min={1} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="isPrivate" className={labelClass}>
                    Private island
                    <Field name="preferences.isPrivate">
                      {({ field }: FieldProps) => {
                        return (
                          <div>
                            <input type="checkbox" {...field} />
                          </div>
                        );
                      }}
                    </Field>
                  </Label>
                </FormGroup>
              </Col>
            </Collapse>
            <Button
              onClick={() => {
                if (!formikProps.isValid) {
                  setIsOpenSection(sections.FIRST);
                }
                if (formikProps.isValid) {
                  formikProps.submitForm();
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
