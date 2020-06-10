import React, { useState } from 'react';
import './Filters.scss';
import { Collapse, Button, CustomInput, Label, Row, Col } from 'reactstrap';
import { DoubleSlider } from '../../../ui/DoubleSlider/DoubleSlider';

type Props = {
  filters: { minPrice: number; maxPrice: number; fees: boolean | null };
  onSetFilters: (filters: { minPrice: number; maxPrice: number; fees: boolean | null }) => void;
};

export const Filters = React.memo(({ filters, onSetFilters }: Props) => {
  const [openFilters, setOpenFilters] = useState(false);
  const { minPrice, maxPrice, fees } = filters;

  const setMinPrice = (minPrice: number) => {
    onSetFilters({ minPrice, maxPrice, fees });
  };
  const setMaxPrice = (maxPrice: number) => {
    onSetFilters({ minPrice, maxPrice, fees });
  };
  const setFees = (fees: boolean | null) => {
    onSetFilters({ minPrice, maxPrice, fees });
  };

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
            <DoubleSlider
              valueMin={filters.minPrice}
              valueMax={filters.maxPrice}
              onChangeMin={setMinPrice}
              onChangeMax={setMaxPrice}
              range={{ min: 0, max: 1000 }}
            />
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
                  setFees(true);
                }}
              />
              <CustomInput
                type="radio"
                id="no"
                name="fees"
                label="No"
                onClick={() => {
                  setFees(false);
                }}
              />
              <CustomInput
                type="radio"
                id="any"
                name="fees"
                label="Any"
                defaultChecked={true}
                onClick={() => {
                  setFees(null);
                }}
              />
            </div>
          </Col>
        </Row>
      </Collapse>
    </>
  );
});
