import React from 'react';
import './DoubleSlider.scss';
import { CustomInput } from 'reactstrap';

type Props = {
  valueMin: number;
  valueMax: number;
  onChangeMin: (min: number) => void;
  onChangeMax: (max: number) => void;
  range?: { min: number; max: number };
  steps?: number;
};

export const DoubleSlider = React.memo(
  ({
    valueMin,
    valueMax,
    onChangeMin,
    onChangeMax,
    range = { min: 1, max: 1000 },
    steps = 1,
  }: Props) => {
    // If range.min is !== 0 the bubbles will not be in the right position
    const updateBubbles = (value: number) => {
      const newValue = (value * 100) / (range.max - range.min);
      const newPosition = 103 - newValue * 1.2;
      return `calc(${newValue}% + (${newPosition}px))`;
    };

    const onMoveThumbs = (currentTargetId: string, currentValue: number) => {
      if (currentTargetId === 'min') {
        onChangeMin(currentValue);
        if (currentValue >= valueMax) {
          onChangeMax(currentValue);
        }
      } else if (currentTargetId === 'max') {
        onChangeMax(currentValue);
        if (currentValue <= valueMin) {
          onChangeMin(currentValue);
        }
      }
    };

    return (
      <div className="middle">
        <div className="price-slider">
          <span>Price range</span>
          <div id="min-value" className="range-min-value" style={{ left: updateBubbles(valueMin) }}>
            <span>{valueMin}</span>
          </div>

          <CustomInput
            id="min"
            value={valueMin}
            className="range-slider__range"
            min={range.min}
            max={range.max}
            step={steps}
            type="range"
            onChange={e => {
              onMoveThumbs(e.target.id, +e.target.value);
            }}
          />
          <div id="max-value" className="range-max-value" style={{ left: updateBubbles(valueMax) }}>
            <span>{valueMax}</span>
          </div>
          <CustomInput
            id="max"
            value={valueMax}
            className="range-slider__range"
            min={range.min}
            max={range.max}
            step={steps}
            type="range"
            onChange={e => {
              onMoveThumbs(e.target.id, +e.target.value);
            }}
          />
        </div>
      </div>
    );
  },
);
