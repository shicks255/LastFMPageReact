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
    isLoading, error, data,
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
      <section className="mainContent">
        <h1 className="title myTitle has-text-centered">Charts & Graphs</h1>
      </section>
      <TreeMaps />
      <div>
        <LineGraph recentTracks={recentTracks} />
      </div>
      <br />
      <br />
      <hr />
      <div>
        <Sunburst recentTracks={recentTracks} />
      </div>
      <br />
      <br />
      <hr />
      <div>
        <BumpChart recentTracks={recentTracks} />
      </div>
      <br />
      <br />
    </>
  );
});

export default Visuals;
