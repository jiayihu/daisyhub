import React, { useState } from 'react';
import { Col, Collapse, FormGroup, Label, Button, Row } from 'reactstrap';
import { parse, format } from 'date-fns';
import { Form, Formik } from 'formik';
import { string, object, number, ref } from 'yup';
import { Bulletin, BulletinBody } from '../../../../types/bulletin';
import { NarrowContainer } from '../../../ui/NarrowContainer/NarrowContainer';
import { CollapseHeader } from '../../../ui/CollapseHeader/CollapseHeader';
import {
  TextFieldWithMessage,
  SelectFieldWithMessage,
  NumberFieldWithMessage,
  CheckboxFieldWithMessage,
  DateFieldWithMessage,
  TimeFieldWithMessage,
} from '../../../ui/Formik';

enum sections {
  ESSENTIAL = 'essential',
  ADVANCED = 'advanced',
}

type Props = {
  bulletin: Bulletin;
  onSubmit: (bulletinBody: BulletinBody) => void;
};

export const BulletinForm = ({ bulletin, onSubmit }: Props) => {
  const [isOpenSection, setIsOpenSection] = useState(sections.ESSENTIAL);
  const [dateTime] = useState(() => {
    let msTime: number;
    if (bulletin.time) {
      const islandDate = bulletin.time;
      msTime = Date.parse(islandDate);
    } else {
      msTime = new Date().getTime();
    }
    const date = format(msTime, 'yyyy-MM-dd');
    const time = format(msTime, 'HH:mm');
    return { date, time };
  });

  return (
    <NarrowContainer hasBg>
      <Formik
        initialValues={{
          dodo: bulletin.dodo,
          island: {
            name: bulletin.island.name,
            player: bulletin.island.player,
            fruit: bulletin.island.fruit,
            villager: bulletin.island.villager,
            hemisphere: bulletin.island.hemisphere,
          },
          turnipPrice: bulletin.turnipPrice,
          description: bulletin.description,
          date: dateTime.date,
          time: dateTime.time,
          preferences: {
            concurrent: bulletin.preferences.concurrent,
            queue: bulletin.preferences.queue,
            hasFee: bulletin.preferences.hasFee,
            isPrivate: bulletin.preferences.isPrivate,
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
          turnipPrice: number()
            .min(0, "The price can't be lower than 0 ")
            .max(999, 'Price too high'),
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
          const date = parse(fields.date, 'yyyy-MM-dd', new Date());
          const time = parse(fields.time, 'HH:mm', new Date());
          date.setHours(time.getHours());
          date.setMinutes(time.getMinutes());

          const bulletinBody: BulletinBody = {
            ...fields,
            time: date.toISOString(),
          };

          onSubmit(bulletinBody);
        }}
      >
        {() => {
          return (
            <Form>
              <CollapseHeader
                isOpen={isOpenSection === sections.ESSENTIAL}
                onClick={() => setIsOpenSection(sections.ESSENTIAL)}
              >
                <h2 className="h3">Essential informations</h2>
              </CollapseHeader>
              <Collapse isOpen={isOpenSection === sections.ESSENTIAL}>
                <FormGroup>
                  <Label for="dodo">DODO Code</Label>
                  <TextFieldWithMessage id="dodo" name="dodo" />
                </FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="island-name">Island Name</Label>
                      <TextFieldWithMessage id="island-name" name="island.name" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="player-name">Player Name</Label>
                      <TextFieldWithMessage id="player-name" name="island.player" />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="description">Description and requests</Label>
                  <TextFieldWithMessage id="description" name="description" />
                </FormGroup>
                <FormGroup>
                  <Label for="fruit">Fruit</Label>
                  <SelectFieldWithMessage id="fruit" name="island.fruit">
                    <option value="apple">Apples</option>
                    <option value="peach">Peaches</option>
                    <option value="orange">Oranges</option>
                    <option value="pear">Pears</option>
                    <option value="cherry">Cherries</option>
                  </SelectFieldWithMessage>
                </FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="price">Selling price</Label>
                      <NumberFieldWithMessage id="price" name="turnipPrice" min={0} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Label for="fees">Entry fees</Label>
                    <FormGroup check>
                      <div>
                        <CheckboxFieldWithMessage
                          id="fees"
                          name="preferences.hasFee"
                          defaultChecked={bulletin.preferences.hasFee}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Collapse>
              <CollapseHeader
                isOpen={isOpenSection === sections.ADVANCED}
                onClick={() => setIsOpenSection(sections.ADVANCED)}
              >
                <h2 className="h3">Additional options</h2>
              </CollapseHeader>
              <Collapse isOpen={isOpenSection === sections.ADVANCED}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="date">Date</Label>
                      <DateFieldWithMessage id="date" name="date" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="time">Time</Label>
                      <TimeFieldWithMessage id="time" name="time" />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="concurrent">
                    How many people can visit your island at the same time?
                  </Label>
                  <NumberFieldWithMessage id="concurrent" name="preferences.concurrent" min={1} />
                </FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="queue">Max queue length</Label>
                      <NumberFieldWithMessage id="queue" name="preferences.queue" min={1} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Label for="is-private">
                      Private island - <small>Won't be listed publicly</small>
                    </Label>
                    <FormGroup check>
                      <div>
                        <CheckboxFieldWithMessage
                          id="is-private"
                          name="preferences.isPrivate"
                          defaultChecked={bulletin.preferences.isPrivate}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Collapse>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </NarrowContainer>
  );
};
