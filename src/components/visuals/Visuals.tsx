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
      <option value={value} key={value} selected={value === state.timeFrame}>
        {timeFrames[value]}
      </option>
    ));

  const { recentTracksBigQuery } = useLastFmApi();

  if (state.recentTracksBigError) return <ErrorMessage error={state.recentTracksBigError} />;

  return (
    <>
      <div className="columns is-mobile">
        <div className="box column is-half is-offset-one-quarter">
          <table className="menuTable">
            <tbody>
              <tr>
                <td>
                  <b>
                    Time
                    <br />
                    Frame:
                  </b>
                </td>
                <td>
                  <div className="select is-rounded">
                    <select onChange={(event) => actions.setTimeFrame(event.target.value)}>
                      {timeFrameSelects}
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <div className="columns">
        <TreeMap name="Artists" keyy="name" value="playcount" />
      </div>
      <hr />
      <div className="columns">
        <TreeMap name="Albums" keyy="name" value="playcount" />
      </div>
      <hr />
      <div className="columns">
        {/* <LineGraph recentTracksQuery={recentTracksBigQuery} /> */}
      </div>
      <hr />
      <div className="columns">
        <Sunburst recentTracksQuery={recentTracksBigQuery} />
      </div>
      <hr />
      <div className="columns">
        <BumpChart recentTracksQuery={recentTracksBigQuery} />
      </div>
    </>
  );
});

export default Visuals;
