import React, { useRef, useEffect } from 'react';
import './DoubleSlider.scss';
import { CustomInput } from 'reactstrap';

type Props = {
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
};

export const DoubleSlider = React.memo(({ setMinPrice, setMaxPrice }: Props) => {
  const minSlider = useRef<HTMLInputElement>(null);
  const minBubble = useRef<HTMLInputElement>(null);

  const maxSlider = useRef<HTMLInputElement>(null);
  const maxBubble = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateBubbles(minSlider.current!, minBubble.current!);
    updateBubbles(maxSlider.current!, maxBubble.current!);
  }, []);

  const updateBubbles = (cursorRef: HTMLInputElement, bubbleRef: HTMLInputElement) => {
    if (cursorRef && bubbleRef) {
      const newValue =
        (Number(cursorRef.value) * 100) / (Number(cursorRef.max) - Number(cursorRef.min));
      const newPosition = 103 - newValue * 1.2;
      bubbleRef.innerHTML = `<span>${cursorRef.value}</span>`;
      bubbleRef.style.left = `calc(${newValue}% + (${newPosition}px))`;
    }
  };

  const avoidOverlay = (e: React.ChangeEvent) => {
    if (maxSlider.current && minSlider.current) {
      const _max = maxSlider.current;
      const _min = minSlider.current;
      if (_min.valueAsNumber + 1 >= _max.valueAsNumber && e.currentTarget.id === _max.id) {
        _min.valueAsNumber = _max.valueAsNumber - 1;
        updateBubbles(_min, minBubble.current!);
      } else if (_max.valueAsNumber - 1 <= _min.valueAsNumber && e.currentTarget.id === _min.id) {
        _max.valueAsNumber = _min.valueAsNumber + 1;
        updateBubbles(_max, maxBubble.current!);
      }
    }
  };

  return (
    <div className="middle">
      <div className="price-slider">
        <span>Price range</span>
        <div id="min-value" ref={minBubble} className="range-min-value"></div>
        <CustomInput
          id="min-price"
          defaultValue={0}
          className="range-slider__range"
          min="0"
          max="999"
          step="1"
          type="range"
          innerRef={minSlider}
          onChange={e => {
            setMinPrice(e.currentTarget.valueAsNumber);
            avoidOverlay(e);
            updateBubbles(minSlider.current!, minBubble.current!);
          }}
        />
        <div id="max-value" ref={maxBubble} className="range-max-value"></div>
        <CustomInput
          id="max-price"
          defaultValue={1000}
          className="range-slider__range"
          min="1"
          max="1000"
          step="1"
          type="range"
          innerRef={maxSlider}
          onChange={e => {
            setMaxPrice(e.currentTarget.valueAsNumber);
            avoidOverlay(e);
            updateBubbles(maxSlider.current!, maxBubble.current!);
          }}
        />
      </div>
    </div>
  );
});
