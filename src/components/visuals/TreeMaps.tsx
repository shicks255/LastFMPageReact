import React from 'react';
import { useApiDispatch } from '../../contexts/ApiContext';
import { timeFrames } from '../../utils';
import TreeMap from './TreeMap';

const TreeMaps: () => JSX.Element = () => {
  const { setTimeFrame } = useApiDispatch();
  const timeFrameSelects = Object.keys(timeFrames)
    .map((value) => (
      <option value={value} key={value}>
        {timeFrames[value]}
      </option>
    ));
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
                <select onChange={(event) => setTimeFrame(event.target.value)}>
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
      <div className="mainContent">
        <TreeMap name="Albums" keyy="name" value="playcount" />
      </div>
      <hr />
    </>
  );
};

export default TreeMaps;
