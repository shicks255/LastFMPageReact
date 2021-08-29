/* eslint-disable quote-props */
import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { years, months } from '../../utils';
import { LocalStateContext } from '../../contexts/LocalStateContext';

interface calData {
  plays: number,
  timeGroup: string,
}

interface calData2 {
  [key: string]: number,
}

export default function Radar() {
  const { state, actions } = useContext(LocalStateContext);
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);

  const [year, setYear] = useState(2021);
  const [month, setMonth] = useState('Jan');

  async function myFetch() {
    await fetch(
      `https://musicapi.shicks255.com/api/v1/scrobbles/grouped?userName=${state.userName}&from=2005-01-01&to=2021-12-31&timeGroup=YEAR`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => Promise.all([res.ok, res.json()]))
      .then(([ok, body]) => {
        setChartData(body);
        return body;
      });
  }

  async function myFetch2() {
    fetch(
      `http://localhost:8686/api/v1/scrobbles/grouped?userName=${state.userName}&from=2005-01-01&to=2021-12-31&timeGroup=MONTH`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => Promise.all([res.ok, res.json()]))
      .then(([ok, body]) => {
        setChartData2(body);
        return body;
      });
  }

  async function myFetch3() {
    let from;
    const monthOrdinal = months[month] - 1;

    // eslint-disable-next-line prefer-destructuring
    from = years[year][0].split('-')[0];
    from = new Date(year, monthOrdinal, 1);
    const to = new Date(from);
    to.setMonth(monthOrdinal + 1);
    to.setDate(to.getDate() - 1);

    const monthArg = from.getMonth() < 9 ? `0${from.getMonth() + 1}` : from.getMonth() + 1;

    const fromArg = `${from.getFullYear()}-${monthArg}-0${from.getDate()}`;
    const toArg = `${to.getFullYear()}-${monthArg}-${to.getDate()}`;

    fetch(
      `http://localhost:8686/api/v1/scrobbles/grouped?userName=${state.userName}&from=${fromArg}&to=${toArg}&timeGroup=DAY`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => Promise.all([res.ok, res.json()]))
      .then(([ok, body]) => {
        setChartData3(body);
        return body;
      });
  }

  useEffect(() => {
    myFetch();
    myFetch2();
    myFetch3();
  }, [year, month]);

  if (!chartData || !chartData2 || !chartData3) {
    return <></>;
  }

  const chart = chartData.map((item: calData) => ({
    year: item.timeGroup,
    plays: item.plays,
  }));

  const chart2: {[key: string]: number }[] = [];
  const yearKeys = new Set<string>();
  const monthKeys = new Set();

  chartData2
    .forEach((item: calData) => {
      const [yearr, monthh] = item.timeGroup.split('-');
      const m = parseInt(monthh, 10);
      yearKeys.add(yearr);
      monthKeys.add(m);
      let o = chart2.find((x) => x.month === m);
      if (o) {
        o[yearr] = item.plays;
      } else {
        o = { 'month': m };
        o[yearr] = item.plays;
        chart2.push(o);
      }
    });

  chart2.sort((i1: {[key: string]: number }, i2: {[key: string]: number }) => {
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

  const chart3 = chartData3.sort((i1: calData, i2: calData) => {
    if (i1.timeGroup > i2.timeGroup) {
      return 1;
    }
    return -1;
  }).map((item: calData) => ({
    day: item.timeGroup.split('-')[2],
    plays: item.plays,
  }));

  const yearStrings = Object.keys(years).map((item) => (
    <option key={item} value={item} selected={year === +item}>
      {item}
    </option>
  ));
  const monthStrings = Object.keys(months).map((item) => (
    <option key={item} value={item} selected={month === item}>
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
          <ResponsiveRadar
            indexBy="year"
            keys={['plays']}
            data={chart}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="column is-full has-text-centered">
        <div style={{ height: '350px', fontWeight: 'bold' }}>
          <ResponsiveRadar
            indexBy="month"
            keys={yearKe}
            data={chart2}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="column is-full has-text-centered">
        <div className="select is-danger">
          <select onChange={(event) => setYear(+event.target.value)}>
            {yearStrings}
          </select>
          <select onChange={(event) => setMonth(event.target.value)}>
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
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
