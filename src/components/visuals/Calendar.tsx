import React, { useContext, useState } from 'react';

import { ResponsiveCalendar } from '@nivo/calendar';

import { years } from '../../utils';
import Loader from '../common/Loader';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';
import useIsMobile from '@/hooks/useIsMobile';

interface ICalData {
  plays: number;
  timeGroup: string;
}

const Calendar: React.FC<Record<string, void>> = () => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState('2022');
  const year = years[timeFrame];
  const chartData = useScrobblesGrouped(state.userName, 'DAY', year[0], year[1]);
  const isMobile = useIsMobile();

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

  const currentYear = new Date().getFullYear();
  const timeFrameSelects = Object.keys(years)
    .filter((year) => year <= `${currentYear}`)
    .map((key) => (
      <option value={key} key={key}>
        {key}
      </option>
    ));

  const boxHeight = isMobile ? '900px' : '350px';

  return (
    <div>
      <div style={{ height: boxHeight, fontWeight: 'bold' }}>
        <section>
          <h1>Scrobbles Calendar</h1>
          <div>
            <div>
              <select
                className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
                value={timeFrame}
                onChange={(event) => setTimeFrame(event.target.value)}
              >
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
          direction={isMobile ? 'vertical' : 'horizontal'}
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
              anchor: 'top-left',
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
