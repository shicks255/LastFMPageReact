import React, { useContext, useState } from 'react';

import { ResponsiveCalendar } from '@nivo/calendar';

import { years } from '../../utils';
import Loader from '../common/Loader';
import VisualTitle from './common/VisualTitle';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';
import useIsMobile from '@/hooks/useIsMobile';

interface ICalData {
  plays: number;
  timeGroup: string;
}

const Calendar: React.FC<Record<string, void>> = () => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState(new Date().getFullYear().toString());
  const year = years[timeFrame];
  const chartData = useScrobblesGrouped(state.userName, 'DAY', year[0], year[1]);
  const isMobile = useIsMobile();

  if (chartData.isLoading || !chartData || !chartData.data) {
    return <Loader />;
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
      <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: boxHeight, fontWeight: 'bold' }}>
        <VisualTitle title="Scrobble Calendar" />
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
        <ResponsiveCalendar
          data={chart}
          from={year[2]}
          to={year[1]}
          margin={{
            top: isMobile ? 25 : 0,
            right: 0,
            bottom: 0,
            left: 15
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
          yearLegendOffset={6}
          legends={[
            {
              anchor: 'top-left',
              direction: isMobile ? 'column' : 'row',
              translateY: 25,
              translateX: isMobile ? 10 : 0,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: isMobile ? 'top-to-bottom' : 'right-to-left'
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Calendar;
