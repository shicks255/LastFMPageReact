import React, { useContext, useState } from 'react';

import { ResponsiveCalendar } from '@nivo/calendar';

import { years } from '../../utils';
import Loader from '../common/Loader';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';

interface ICalData {
  plays: number;
  timeGroup: string;
}

const Calendar: React.FC<Record<string, void>> = () => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState('2021');
  const year = years[timeFrame];
  const chartData = useScrobblesGrouped(state.userName, 'DAY', year[0], year[1]);

  if (!chartData || !chartData.data) {
    return <>HIOHOH</>;
  }

  if (chartData.isLoading) {
    return <Loader small={false} />;
  }

  const chart = chartData.data.map((item: ICalData) => ({
    day: item.timeGroup,
    value: item.plays
  }));

  const timeFrameSelects = Object.keys(years).map((key) => (
    <option value={key} key={key}>
      {key}
    </option>
  ));

  return (
    <div>
      <div style={{ height: '350px', fontWeight: 'bold' }}>
        <section>
          <h1>Scrobbles Calendar</h1>
          <div>
            <div>
              <select value={timeFrame} onChange={(event) => setTimeFrame(event.target.value)}>
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
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
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
              itemDirection: 'right-to-left'
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Calendar;
