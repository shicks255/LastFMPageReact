import React, { useContext, useState } from 'react';

import { years } from 'utils';

import Loader from '../common/Loader';
import NoData from '../common/NoData';
import CalendarChart from './charts/CalendarChart';
import VisualTitle from './common/VisualTitle';
import UserYearSelect from './common/YearSelect';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesGrouped from '@/hooks/api/musicApi/useScrobblesGrouped';
import useIsMobile from '@/hooks/useIsMobile';

interface ICalData {
  plays: number;
  timeGroup: string;
}

const Calendar: React.FC = () => {
  const { state } = useContext(LocalStateContext);
  const [timeFrame, setTimeFrame] = useState(new Date().getFullYear().toString());
  const year = years[timeFrame];
  const scrobbles = useScrobblesGrouped(state.userName, 'DAY', year[0], year[1]);
  const isMobile = useIsMobile();

  if (scrobbles.isLoading) {
    return <Loader />;
  }

  if (!scrobbles || !scrobbles.data) {
    return <NoData />;
  }

  const chartData = scrobbles.data.map((item: ICalData) => ({
    day: item.timeGroup,
    value: item.plays
  }));

  const boxHeight = isMobile ? '900px' : '350px';

  return (
    <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: boxHeight, fontWeight: 'bold' }}>
      <VisualTitle title="Scrobble Calendar" />
      <UserYearSelect userName={state.userName} setYear={setTimeFrame} year={timeFrame} />
      <CalendarChart chartData={chartData} from={year[1]} to={year[2]} />
    </div>
  );
};

export default Calendar;
