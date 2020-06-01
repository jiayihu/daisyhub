import React, { useState, useEffect } from 'react';
import './Filters.scss';
import { Collapse, Button, CustomInput, Label } from 'reactstrap';
import { hasFees } from '../Bulletins';

type Props = {
  handleSetFilters: (minPrice: number, maxPrice: number, hasFees: hasFees) => void;
};

export const Filters = ({ handleSetFilters }: Props) => {
  const [openFilters, setOpenFilters] = useState(false);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);
  const [fees, setFees] = useState(hasFees.ANY);

  const updatePriceLabels = () => {
    if (minPrice >= maxPrice) {
      setMinPrice(maxPrice - 1);
    }
    if (maxPrice <= minPrice) {
      setMaxPrice(minPrice + 1);
    }
  };

  useEffect(() => {
    handleSetFilters(minPrice, maxPrice, fees);
  }, [fees, minPrice, maxPrice, handleSetFilters]);

  return (
    <>
      <div className="filter__toggler" onClick={() => setOpenFilters(prevState => !prevState)}>
        <Button className="float-right" color="light" size="sm">
          <span className="filter__toggler-box-icon">
            <span className="filter__toggler-icon"></span>
            <span className="filter__toggler-icon"></span>
            <span className="filter__toggler-icon"></span>
          </span>
          <span className="filter__text">Filters</span>
        </Button>
      </div>
      <Collapse className="filter__container" isOpen={openFilters}>
        <div className="price-slider">
          <CustomInput
            id="min_price"
            value={minPrice}
            className="range-slider__range"
            min="0"
            max="999"
            step="1"
            type="range"
            onChange={e => {
              setMinPrice(e.currentTarget.valueAsNumber);
              updatePriceLabels();
            }}
          />
          <span className="range-slider__min-value">{minPrice}</span>

          <CustomInput
            id="max_price"
            value={maxPrice}
            className="range-slider__range"
            min="1"
            max="1000"
            step="1"
            type="range"
            onChange={e => {
              setMaxPrice(e.currentTarget.valueAsNumber);
              updatePriceLabels();
            }}
          />

          <span className="range-slider__max-value">{maxPrice}</span>
        </div>
        <div>
          <Label for="exampleCheckbox">Fees?</Label>
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
        </div>
      </Collapse>
    </>
  );
};
