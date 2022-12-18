import React, { useContext, useState } from 'react';

import { generateLineChart, getDateRangeFromTimeFrame, getTimeGroupFromTimeFrame } from 'utils';

import Loader from '../common/Loader';
import ResourceSelect from '../common/ResourceSelect';
import TimeFrameSelect from '../common/TimeFrameSelect';
import VisualTitle from '../common/VisualTitle';
import LineChart from './charts/LineChart';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';

const Line: React.FC = () => {
  const { state } = useContext(LocalStateContext);
  const [resourceType, setResourceType] = useState<string>('artist');
  const [timeFrame, setTimeFrame] = useState('7day');

  const resource = resourceType === 'artist' ? 'artistsGrouped' : 'albumsGrouped';
  const { start, end } = getDateRangeFromTimeFrame(timeFrame);
  const timeGroup = getTimeGroupFromTimeFrame(timeFrame);
  const scrobbles = useScrobblesArtistOrAlbumGrouped(
    resource,
    state.userName,
    timeGroup,
    start,
    end,
    12
  );

  const chartNew = generateLineChart(scrobbles, timeFrame, resourceType);

  if (scrobbles.isLoading || !scrobbles || !scrobbles.data) {
    return <Loader />;
  }

  return (
    <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
      <VisualTitle title="Scrobbles Line Chart" />
      <TimeFrameSelect value={timeFrame} onChange={(e: string) => setTimeFrame(e)} />
      <ResourceSelect value={resourceType} onChange={(e: string) => setResourceType(e)} />
      <div className="mb-12 mt-4 pl-4 pr-4" style={{ height: '500px', fontWeight: 'bold' }}>
        <LineChart chartData={chartNew} timeFrame={timeFrame} />
      </div>
    </div>
  );
};

export default Line;
