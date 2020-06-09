import React, { useState, useEffect } from 'react';
import './Filters.scss';
import { Collapse, Button, CustomInput, Label, Row, Col } from 'reactstrap';
import { DoubleSlider } from '../../../ui/DoubleSlider/DoubleSlider';

type Props = {
  // filters: { minPrice: number; maxPrice: number; fees: boolean | null };
  handleSetFilters: (filters: { minPrice: number; maxPrice: number; fees: boolean | null }) => void;
};

export const Filters = React.memo(({ handleSetFilters }: Props) => {
  const [openFilters, setOpenFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);
  const [fees, setFees] = useState<boolean | null>(null);

  useEffect(() => {
    handleSetFilters({ minPrice, maxPrice, fees });
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
            <DoubleSlider
              valueMin={minPrice}
              valueMax={maxPrice}
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
