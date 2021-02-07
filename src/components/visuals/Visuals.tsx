import React, { useContext } from 'react';
import TreeMap from './TreeMap';
import LineGraph from './LineGraph';
import { timeFrames } from '../../utils';
import Sunburst from './SunburstChart';
import BumpChart from './BumpChart';
import useLastFmApi from '../../hooks/useLasftFmApi';
import { LocalStateContext } from '../../LocalStateContext';
import ErrorMessage from '../ErrorMessage';

const Visuals: React.FC<Record<string, void>> = (() => {
  const { state, actions } = useContext(LocalStateContext);
  const timeFrameSelects = Object.keys(timeFrames)
    .map((value) => (
      <option value={value} key={value}>
        {timeFrames[value]}
      </option>
    ));

  const { recentTracksBigQuery } = useLastFmApi();

  if (state.recentTracksBigError) return <ErrorMessage error={state.recentTracksBigError} />;

  return (
    <>
      <div className="is-mobile">
        <div className="box column is-half is-offset-one-quarter has-text-centered">
          <div className="columns has-text-black" style={{ padding: '10px' }}>
            <div className="column has-text-right-tablet" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <b>
                Time Frame:
              </b>
            </div>
            <div className="column has-text-left-tablet">
              <div className="select is-danger">
                <select onChange={(event) => actions.setTimeFrame(event.target.value)}>
                  {timeFrameSelects}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="mainContent">
        <TreeMap name="Artists" keyy="name" value="playcount" />
      </div>
      <hr />
      <div>
        <TreeMap name="Albums" keyy="name" value="playcount" />
      </div>
      <hr />
      <div>
        <LineGraph recentTracksQuery={recentTracksBigQuery} />
      </div>
      <hr />
      <div>
        <Sunburst recentTracksQuery={recentTracksBigQuery} />
      </div>
      <hr />
      <div>
        <BumpChart recentTracksQuery={recentTracksBigQuery} />
      </div>
    </>
  );
});

export default Visuals;
