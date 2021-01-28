import React from 'react';
import TreeMap from './TreeMap';
import LineGraph from './LineGraph';
import { timeFrames } from '../../utils';
import Sunburst from './SunburstChart';
import BumpChart from './BumpChart';
import useLastFmApi from '../../useLasftFmApi';

export default function Visuals() {
  const timeFrames2 = Object.keys(timeFrames)
    .map((value) => <option key={value}>{timeFrames[value]}</option>);

  const { recentTracksBigQuery } = useLastFmApi();

  return (
    <>
      <div className="columns is-mobile">
        <div className="box column is-half is-offset-one-quarter">
          <table className="menuTable">
            <tbody>
              <tr>
                <td>Time Frame:</td>
                <td>
                  <select>
                    {timeFrames2}
                  </select>
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
        <LineGraph recentTracksQuery={recentTracksBigQuery} />
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
}
