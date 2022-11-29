/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useContext, useState } from 'react';

import { generateBumpChart, getDateRangeFromTimeFrame, getTimeGroupFromTimeFrame } from 'utils';

import Loader from '../common/Loader';
import NoData from '../common/NoData';
import ResourceSelect from '../common/ResourceSelect';
import TimeFrameSelect from '../common/TimeFrameSelect';
import BumpChart from './charts/BumpChart';
import VisualTitle from './common/VisualTitle';
import { LocalStateContext } from '@/contexts/LocalStateContext';
import useScrobblesArtistOrAlbumGrouped from '@/hooks/api/musicApi/useScrobblesArtistOrAlbumGrouped';

const Bump: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('7day');
  const [resourceType, setResourceType] = useState<string>('artist');
  const [start, end] = getDateRangeFromTimeFrame(timeFrame);
  const timeGroup = getTimeGroupFromTimeFrame(timeFrame);

  const { state } = useContext(LocalStateContext);

  const resource = resourceType === 'artist' ? 'artistsGrouped' : 'albumsGrouped';
  const scrobbles = useScrobblesArtistOrAlbumGrouped(
    resource,
    state.userName,
    timeGroup,
    start,
    end,
    12
  );

  if (scrobbles.isLoading || !scrobbles || !scrobbles.data) {
    return <Loader />;
  }

  if (!scrobbles.data) {
    return <NoData />;
  }

  const chartData = generateBumpChart(scrobbles, resourceType);

  const label =
    resource === 'artistsGrouped'
      ? `Artist Rank By ${timeGroup.substring(0, 1) + timeGroup.substring(1).toLowerCase()}`
      : `Album Rank By ${timeGroup.substring(0, 1) + timeGroup.substring(1).toLowerCase()}`;

  return (
    <div className="mt-4 pl-4 pr-4" style={{ height: '450px', fontWeight: 'bold' }}>
      <VisualTitle title={label} />
      <TimeFrameSelect value={timeFrame} onChange={(e: string) => setTimeFrame(e)} />
      <ResourceSelect value={resourceType} onChange={(e: string) => setResourceType(e)} />
      <BumpChart chartData={chartData} />
    </div>
  );
};

export default Bump;
