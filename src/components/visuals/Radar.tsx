import React, { useContext, useState } from 'react';

import { ResponsiveRadar } from '@nivo/radar';

import { years, months } from '../../utils';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';

interface ICalData {
  plays: number;
  timeGroup: string;
}

const Radar: React.FC<Record<string, void>> = () => {
  const { state } = useContext(LocalStateContext);

  const [year, setYear] = useState(2021);
  const [month, setMonth] = useState('Jan');

  const chart1Data = useScrobblesGrouped(state.userName, 'YEAR', '2005-01-01', '2021-12-31');
  const chart2Data = useScrobblesGrouped(state.userName, 'MONTH', '2005-01-01', '2021-12-31');

  const monthOrdinal = months[month] - 1;
  const from = new Date(year, monthOrdinal, 1);
  const to = new Date(from);
  to.setMonth(monthOrdinal + 1);
  to.setDate(to.getDate() - 1);

  const monthArg = from.getMonth() < 9 ? `0${from.getMonth() + 1}` : from.getMonth() + 1;

  const fromArg = `${from.getFullYear()}-${monthArg}-0${from.getDate()}`;
  const toArg = `${to.getFullYear()}-${monthArg}-${to.getDate()}`;
  const chart3Data = useScrobblesGrouped(state.userName, 'DAY', fromArg, toArg);

  if (!chart1Data || !chart1Data.data) {
    return <></>;
  }
  if (!chart2Data || !chart2Data.data) {
    return <></>;
  }
  if (!chart3Data || !chart3Data.data) {
    return <></>;
  }

  const chart = chart1Data.data.map((item: ICalData) => ({
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

  const yearStrings = Object.keys(years).map((item) => (
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
      <div className="column is-full has-text-centered">
        <div style={{ height: '350px', fontWeight: 'bold' }}>
          <section className="mainContent">
            <h1 className="title myTitle has-text-left-tablet noMarginBottom">Scrobbles Radar</h1>
          </section>
          <ResponsiveRadar indexBy="year" keys={['plays']} data={chart} />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="column is-full has-text-centered">
        <div style={{ height: '350px', fontWeight: 'bold' }}>
          <ResponsiveRadar indexBy="month" keys={yearKe} data={chart2} />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="column is-full has-text-centered">
        <div className="select is-danger">
          <select value={year} onChange={(event) => setYear(+event.target.value)}>
            {yearStrings}
          </select>
          <select value={month} onChange={(event) => setMonth(event.target.value)}>
            {monthStrings}
          </select>
        </div>
        <br />
        <br />
        <br />
        <div style={{ height: '350px', fontWeight: 'bold' }}>
          <ResponsiveRadar
            indexBy="day"
            keys={['plays']}
            data={chart3}
            legends={[
              {
                anchor: 'top-left',
                direction: 'column',
                translateX: 55,
                translateY: 0,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Radar;
