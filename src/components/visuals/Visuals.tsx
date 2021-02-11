import React from 'react';
import LineGraph from './LineGraph';
import Sunburst from './SunburstChart';
import BumpChart from './BumpChart';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import TreeMaps from './TreeMaps';
import { useRecentTracksBig } from '../../hooks/useLasftFmApi';

const Visuals: React.FC<Record<string, void>> = (() => {
  const {
    isLoading, isError, error, data,
  } = useRecentTracksBig();

  if (isLoading) return <Loader small />;
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return <ErrorMessage error={new Error('')} />;

  const recentTracks = data.track
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
