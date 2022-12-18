import React, { SetStateAction } from 'react';

import { getYearsFromUserYears } from 'utils';

import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';

interface IProps {
  userName: string;
  setYear: React.Dispatch<SetStateAction<string>>;
  year: string;
}

const UserYearSelect: React.FC<IProps> = ({ userName, setYear, year }: IProps) => {
  const yearss = useScrobblesGrouped(userName, 'YEAR', '2000-01-01', '2022-12-16');

  if (!yearss.data || yearss.isLoading) {
    return null;
  }

  const x = yearss.data.map((e) => e.timeGroup);
  const years = getYearsFromUserYears(x);

  const timeFrameSelects = Object.keys(years).map((item) => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });

  return (
    <select
      className="px-3 py-1.5 md:w-32 w-full
                rounded border border-solid
                border-gray-300 transition ease-in-out bg-white"
      value={year}
      onChange={(event) => setYear(event.target.value)}
    >
      {timeFrameSelects}
    </select>
  );
};

export default UserYearSelect;
