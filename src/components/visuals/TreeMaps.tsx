import React from 'react';
import { useApiDispatch, useApiState } from '../../contexts/ApiContext';
import { timeFrames } from '../../utils';
import TreeMap from './TreeMap';

const TreeMaps: () => JSX.Element = () => {
  const { timeFrame } = useApiState();
  const { setTimeFrame } = useApiDispatch();
  const timeFrameSelects = Object.keys(timeFrames)
    .map((value) => (
      <option value={value} key={value} selected={timeFrame === value}>
        {timeFrames[value]}
      </option>
    ));
  return (
    <>
      <hr />
      <section className="mainContent">
        <h1 className="title myTitle has-text-left-tablet">Heat Maps</h1>
      </section>
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
      <section>
        <article className="mainContent">
          <TreeMap name="Artists" keyy="name" value="playcount" />
        </article>
        <br />
        <article className="mainContent">
          <TreeMap name="Albums" keyy="name" value="playcount" />
        </article>
        <br />
        <hr />
      </section>
    </>
  );
};

export default TreeMaps;
