import React from 'react';

import { years } from 'utils';

interface IProps {
  setYearSelect: (string) => void;
  value: string;
}

const YearSelect: React.FC<IProps> = (props) => {
  const { setYearSelect, value } = props;
  const currentYear = new Date().getFullYear();
  const timeFrameSelects = Object.keys(years)
    .filter((year) => year <= `${currentYear}`)
    .map((key) => (
      <option value={key} key={key}>
        {key}
      </option>
    ));
  return (
    <div>
      <select
        className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
        value={value}
        onChange={(event) => setYearSelect(event.target.value)}
      >
        {timeFrameSelects}
      </select>
    </div>
  );
};

export default YearSelect;
