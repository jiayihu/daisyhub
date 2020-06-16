import React from 'react';
import './Filters.scss';
import { Row, Col } from 'reactstrap';
import { DoubleSlider } from '../../../ui/DoubleSlider/DoubleSlider';
import { TFilters } from '../Bulletins';
import { Checkbox } from '../../../ui/Checkbox/Checkbox';

type Props = {
  filters: { minPrice: number; maxPrice: number; fees: boolean | null };
  onSetFilters: (filters: TFilters) => void;
};

export const Filters = React.memo(({ filters, onSetFilters }: Props) => {
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
          <fieldset id="fees">
            <legend>Fees? </legend>
            <Checkbox
              type="radio"
              id="yes"
              name="fees"
              label="Yes"
              onClick={() => {
                setFees(true);
              }}
            />
            <Checkbox
              type="radio"
              id="no"
              name="fees"
              label="No"
              onClick={() => {
                setFees(false);
              }}
            />
            <Checkbox
              type="radio"
              id="any"
              name="fees"
              label="Any"
              defaultChecked={true}
              onClick={() => {
                setFees(null);
              }}
            />
          </fieldset>
        </Col>
      </Row>
    </>
  );
});
