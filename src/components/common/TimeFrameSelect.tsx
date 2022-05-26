import React from 'react';

import { timeFrames } from '../../utils';

interface IProps {
  onChange: (e: string) => void;
}

const TimeFrameSelect: React.FC<IProps> = (props: IProps) => {
  const { onChange } = props;

  const timeFrameSelects = Object.keys(timeFrames).map((value) => (
    <option value={value} key={value}>
      {timeFrames[value]}
    </option>
  ));

  return (
    <select
      className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
      onChange={(e) => onChange(e.target.value)}
    >
      {timeFrameSelects}
    </select>
  );
};

export default TimeFrameSelect;
