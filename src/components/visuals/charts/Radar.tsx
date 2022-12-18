import React, { useContext, useState } from 'react';

import { ResponsiveRadar } from '@nivo/radar';

import { years, months, cColors, formatNumber } from '../../../utils';
import Loader from '../../common/Loader';
import VisualTitle from '../../common/VisualTitle';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';

interface ICalData {
  plays: number;
  timeGroup: string;
}

const Radar: React.FC<Record<string, void>> = () => {
  const { state } = useContext(LocalStateContext);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(Object.keys(months)[new Date().getMonth()]);

  const chart1Data = useScrobblesGrouped(state.userName, 'YEAR', '2005-01-01', '2022-12-31');
  const chart2Data = useScrobblesGrouped(state.userName, 'MONTH', '2005-01-01', '2022-12-31');

  const monthOrdinal = months[month] - 1;
  const from = new Date(year, monthOrdinal, 1);
  const to = new Date(from);
  to.setMonth(monthOrdinal + 1);
  to.setDate(to.getDate() - 1);

  const monthArg = from.getMonth() < 9 ? `0${from.getMonth() + 1}` : from.getMonth() + 1;

  const fromArg = `${from.getFullYear()}-${monthArg}-0${from.getDate()}`;
  const toArg = `${to.getFullYear()}-${monthArg}-${to.getDate()}`;
  const chart3Data = useScrobblesGrouped(state.userName, 'DAY', fromArg, toArg);

  if (
    !chart1Data ||
    !chart1Data.data ||
    !chart2Data ||
    !chart2Data.data ||
    !chart3Data ||
    !chart3Data.data
  ) {
    return <Loader />;
  }

  const chart = chart1Data.data
    .sort((a, b) => {
      return a.timeGroup > b.timeGroup ? 1 : -1;
    })
    .map((item: ICalData) => ({
      year: item.timeGroup,
      plays: item.plays
    }));

  const chart2: { [key: string]: number }[] = [];
  const yearKeys = new Set<string>();
  const monthKeys = new Set();

  chart2Data.data.forEach((item: ICalData) => {
    const [yearr, monthh] = item.timeGroup.split('-');
    const m = parseInt(monthh, 10);
    yearKeys.add(yearr);
    monthKeys.add(m);
    let o = chart2.find((x) => x.month === m);
    if (o) {
      o[yearr] = item.plays;
    } else {
      o = { month: m };
      o[yearr] = item.plays;
      chart2.push(o);
    }
  });

  chart2.sort((i1: { [key: string]: number }, i2: { [key: string]: number }) => {
    if (i1.month > i2.month) {
      return 1;
    }
    return -1;
  });

  yearKeys.forEach((yearKey: string) => {
    chart2.forEach((char) => {
      if (!Object.prototype.hasOwnProperty.call(char, yearKey)) {
        char[yearKey] = 0;
      }
    });
  });
  const yearKe: string[] = Array.from(yearKeys) as string[];

  const chart3 = chart3Data.data
    .sort((i1: ICalData, i2: ICalData) => {
      if (i1.timeGroup > i2.timeGroup) {
        return 1;
      }
      return -1;
    })
    .map((item: ICalData) => ({
      day: item.timeGroup.split('-')[2],
      plays: item.plays
    }));

  const currentYear = new Date().getFullYear();
  const yearStrings = Object.keys(years)
    .filter((year) => year <= `${currentYear}`)
    .map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
  const monthStrings = Object.keys(months).map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <>
      <div>
        <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '450px', fontWeight: 'bold' }}>
          {(!chart1Data || chart1Data.isLoading) && <Loader />}
          <section>
            <div className="text-left text-2xl font-semibold">Scrobbles Per Year Radar</div>
          </section>
          <ResponsiveRadar
            colors={['rgb(12 74 110']}
            margin={{
              top: 50,
              bottom: 50,
              left: 50,
              right: 50
            }}
            indexBy="year"
            keys={['plays']}
            data={chart}
            valueFormat={(num) => {
              return formatNumber(num);
            }}
          />
        </div>
      </div>
      <div>
        <div className="mb-12 mt-10 pl-4 pr-4" style={{ height: '450px', fontWeight: 'bold' }}>
          {(!chart2Data || chart2Data.isLoading) && <Loader />}
          <section>
            <div className="text-left text-2xl font-semibold">Scrobbles Per Month Radar</div>
          </section>
          <ResponsiveRadar
            colors={cColors}
            margin={{
              top: 50,
              bottom: 50,
              left: 50,
              right: 50
            }}
            legends={[
              {
                anchor: 'top-left',
                direction: 'column',
                itemDirection: 'left-to-right',
                translateX: 0,
                translateY: 40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: 'rgb(12, 74, 110',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: 'rgb(12, 74, 110)'
                    }
                  }
                ]
              }
            ]}
            indexBy="month"
            keys={yearKe}
            data={chart2}
          />
        </div>
      </div>
      <div>
        <div className="mb-12 mt-10 pl-4 pr-4" style={{ height: '450px', fontWeight: 'bold' }}>
          {(!chart3Data || chart3Data.isLoading) && <Loader />}
          <section>
            <VisualTitle title="Scrobbles Per Day Radar" />
            <select
              className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
              value={year}
              onChange={(event) => setYear(+event.target.value)}
            >
              {yearStrings}
            </select>
            <select
              className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            >
              {monthStrings}
            </select>
          </section>
          <ResponsiveRadar
            indexBy="day"
            margin={{
              top: 50,
              bottom: 50,
              left: 50,
              right: 50
            }}
            keys={['plays']}
            data={chart3}
            colors={['rgb(12 74 110']}
          />
        </div>
      </div>
    </>
  );
};

export default Radar;
