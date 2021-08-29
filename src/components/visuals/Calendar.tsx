import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { years } from '../../utils';
import { LocalStateContext } from '../../contexts/LocalStateContext';

interface calData {
  plays: number,
  timeGroup: string,
}

const Calendar: React.FC<Record<string, void>> = (() => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState('2021');
  const [chartData, setChartData] = useState([]);
  const year = years[timeFrame];
  async function myFetch(): Promise<calData[]> {
    const x = await fetch(
      `https://musicapi.shicks255.com/api/v1/scrobbles/grouped?userName=${state.userName}&from=${year[0]}&to=${year[1]}&timeGroup=DAY`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => Promise.all([res.ok, res.json()]))
      .then(([, body]) => {
        setChartData(body);
        return body;
      });
    return x;
  }

  useEffect(() => {
    myFetch();
  }, [timeFrame]);

  if (!chartData) {
    return <>HIOHOH</>;
  }

  const chart = chartData.map((item: calData) => ({
    day: item.timeGroup,
    value: item.plays,
  }));

  const timeFrameSelects = Object.keys(years).map((key) => (
    <option value={key} key={key} selected={key === timeFrame}>
      {key}
    </option>
  ));

  return (
    <div className="column is-full has-text-centered">
      <div style={{ height: '350px', fontWeight: 'bold' }}>
        <section className="mainContent">
          <h1 className="title myTitle has-text-left-tablet noMarginBottom">Scrobbles Calendar</h1>
          <div className="column has-text-left-tablet">
            <div className="select is-danger">
              <select onChange={(event) => setTimeFrame(event.target.value)}>
                {timeFrameSelects}
              </select>
            </div>
          </div>
        </section>
        <ResponsiveCalendar
          data={chart}
          from={year[2]}
          to={year[1]}
          margin={{
            top: 0, right: 0, bottom: 0, left: 0,
          }}
          emptyColor="#eeeeee"
          yearSpacing={40}
          monthSpacing={4}
          monthBorderColor="#ffffff"
          maxValue={75}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          yearLegendPosition="before"
          yearLegendOffset={-10}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 0,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      </div>
    </div>
  );
});

export default Calendar;
