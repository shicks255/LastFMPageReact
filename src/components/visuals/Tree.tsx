import React from 'react';

import { timeFrames } from '../../utils';
import Loader from '../common/Loader';
import NoData from '../common/NoData';
import TreeMap from './charts/TreeMap';
import VisualTitle from './common/VisualTitle';
import { useApiDispatch, useApiState } from '@/contexts/ApiContext';
import useTopAlbums from '@/hooks/api/lastFm/useTopAlbums';
import useTopArtists from '@/hooks/api/lastFm/useTopArtists';

const Tree: React.FC = () => {
  const { timeFrame, page } = useApiState();
  const { setTimeFrame } = useApiDispatch();

  const topAlbums = useTopAlbums(timeFrame, page);
  const topArtists = useTopArtists(timeFrame, page);

  if (topAlbums.isLoading || topArtists.isLoading) {
    return <Loader />;
  }

  const albumChartData = topAlbums?.data?.topalbums.album.map((item) => {
    return {
      name: `${item.artist.name} - ${item.name}`,
      value: item.playcount
    };
  });

  const artistChartData = topArtists?.data?.topartists.artist.map((item) => {
    return {
      name: item.name,
      value: item.playcount
    };
  });

  if (!albumChartData || !artistChartData) {
    return <NoData />;
  }

  const timeFrameSelects = Object.keys(timeFrames).map((value) => (
    <option value={value} key={value}>
      {timeFrames[value]}
    </option>
  ));
  return (
    <>
      <hr />
      <div>
        <div>
          <div className="p-4">
            <div>
              <div>
                <VisualTitle title="Scrobbles Heat Maps" />
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
          </div>
        </div>
      </div>
      <section>
        <div style={{ height: '350px', fontWeight: 'bold' }}>
          <div className="text-left text-2xl font-semibold pl-4">Artists</div>
          <TreeMap chartData={artistChartData} />
        </div>
        <div className="mt-16" style={{ height: '350px', fontWeight: 'bold' }}>
          <div className="text-left text-2xl font-semibold pl-4">Albums</div>
          <TreeMap chartData={albumChartData} />
        </div>
      </section>
    </>
  );
};

export default Tree;
