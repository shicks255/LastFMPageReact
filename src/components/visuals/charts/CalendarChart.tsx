import React from 'react';

import { ResponsiveCalendar } from '@nivo/calendar';

import useIsMobile from '@/hooks/useIsMobile';

interface IProps {
  from: string;
  to: string;
  chartData: {
    day: string;
    value: number;
  }[];
}

const CalendarChart: React.FC<IProps> = ({ chartData, from, to }: IProps) => {
  const isMobile = useIsMobile();

  return (
    <ResponsiveCalendar
      data={chartData}
      from={from}
      to={to}
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
  );
};

export default CalendarChart;
