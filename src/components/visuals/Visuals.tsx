import React from 'react';
import LineGraph from './LineGraph';
import Sunburst from './SunburstChart';
import BumpChart from './BumpChart';
import useLastFmApi from '../../hooks/useLasftFmApi';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import TreeMaps from './TreeMaps';

const Visuals: React.FC<Record<string, void>> = (() => {
  const { recentTracksBigQuery } = useLastFmApi();
  const recentTracksBigQueryResult = recentTracksBigQuery();

  if (recentTracksBigQueryResult.isLoading) return <Loader small />;
  if (recentTracksBigQueryResult.error) {
    return <ErrorMessage error={recentTracksBigQueryResult.error} />;
  }
  if (!recentTracksBigQueryResult.data) return <ErrorMessage error={new Error('')} />;

  const recentTracks = recentTracksBigQueryResult.data.track
    .filter((x) => Object.prototype.hasOwnProperty.call(x, 'date'));

  return (
    <>
      <TreeMaps />
      <div>
        <LineGraph recentTracks={recentTracks} />
      </div>
      <hr />
      <div>
        <Sunburst recentTracks={recentTracks} />
      </div>
      <hr />
      <div>
        <BumpChart recentTracks={recentTracks} />
      </div>
    </>
  );
});

export default Visuals;
