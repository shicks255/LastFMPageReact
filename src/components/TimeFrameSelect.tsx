import React from 'react';
import { timeFrames } from '../utils';

interface Props {
    timeFrameSelected: string,
    onChange: (e: string) => void
}

export default function TimeFrameSelect(props: Props) {
  const { timeFrameSelected, onChange } = props;

  const timeFrameSelects = Object.keys(timeFrames)
    .map((value) => (
      <option value={value} key={value} selected={timeFrameSelected === value}>
        {timeFrames[value]}
      </option>
    ));

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {timeFrameSelects}
    </select>

  );
}
