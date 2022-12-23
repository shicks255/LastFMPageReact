import React from 'react';

import { timeFrames } from '../../utils';
import { sendChangeTimeFrame } from '@/hooks/useAnalytics';

interface IProps {
  onChange: (e: string) => void;
  value: string;
}

const TimeFrameSelect: React.FC<IProps> = (props: IProps) => {
  const { onChange, value } = props;

  const sendEventAndChangeTimeFrame = (value: string) => {
    sendChangeTimeFrame(value);
    onChange(value);
  };

  const timeFrameSelects = Object.keys(timeFrames).map((value) => (
    <option value={value} key={value}>
      {timeFrames[value]}
    </option>
  ));

  return (
    <select
      value={value}
      className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
      onChange={(e) => sendEventAndChangeTimeFrame(e.target.value)}
    >
      {timeFrameSelects}
    </select>
  );
};

export default TimeFrameSelect;
