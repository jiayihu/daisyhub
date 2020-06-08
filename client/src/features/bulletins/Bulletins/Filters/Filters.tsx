import React, { useState, useEffect } from 'react';
import './Filters.scss';
import { Collapse, Button, CustomInput, Label, Row, Col } from 'reactstrap';
import { hasFees } from '../Bulletins';
import { DoubleSlider } from './DoubleSlider/DoubleSlider';

type Props = {
  handleSetFilters: (minPrice: number, maxPrice: number, hasFees: hasFees) => void;
};

export const Filters = ({ handleSetFilters }: Props) => {
  const [openFilters, setOpenFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);
  const [fees, setFees] = useState(hasFees.ANY);

  useEffect(() => {
    handleSetFilters(minPrice, maxPrice, fees);
  }, [fees, minPrice, maxPrice, handleSetFilters]);

  return (
    <>
      <div className="toggler">
        <Button
          className="float-right"
          onClick={() => setOpenFilters(prevState => !prevState)}
          color="light"
          size="sm"
        >
          <span className="toggler-box-icon">
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
          </span>
          <span>Filters</span>
        </Button>
      </div>
      <Collapse isOpen={openFilters}>
        <Row className="filter-box">
          <Col xs="8">
            <DoubleSlider setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
          </Col>
          <Col xs="auto">
            <Label for="fees">Fees?</Label>
            <div>
              <CustomInput
                type="radio"
                id="yes"
                name="fees"
                label="Yes"
                onClick={() => {
                  setFees(hasFees.YES);
                }}
              />
              <CustomInput
                type="radio"
                id="no"
                name="fees"
                label="No"
                onClick={() => {
                  setFees(hasFees.NO);
                }}
              />
              <CustomInput
                type="radio"
                id="any"
                name="fees"
                label="Any"
                defaultChecked={true}
                onClick={() => {
                  setFees(hasFees.ANY);
                }}
              />
            </div>
          </Col>
        </Row>
      </Collapse>
    </>
  );
};
