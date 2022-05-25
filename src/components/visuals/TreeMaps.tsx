import React from 'react';

import { timeFrames } from '../../utils';
import TreeMap from './TreeMap';
import { useApiDispatch, useApiState } from '@/contexts/ApiContext';

const TreeMaps: () => JSX.Element = () => {
  const { timeFrame } = useApiState();
  const { setTimeFrame } = useApiDispatch();
  const timeFrameSelects = Object.keys(timeFrames).map((value) => (
    <option value={value} key={value}>
      {timeFrames[value]}
    </option>
  ));
  return (
    <>
      <hr />
      <div className="is-mobile">
        <div className="box column is-half is-offset-one-quarter has-text-centered">
          <div className="columns has-text-black p-4">
            <div
              className="column has-text-right-tablet"
              style={{ marginTop: 'auto', marginBottom: 'auto' }}
            >
              <b>Time Frame:</b>
            </div>
            <div className="column has-text-left-tablet">
              <div className="select is-danger">
                <select value={timeFrame} onChange={(event) => setTimeFrame(event.target.value)}>
                  {timeFrameSelects}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <article>
          <TreeMap name="Artists" keyy="name" value="playcount" />
        </article>
        <article className="mt-16">
          <TreeMap name="Albums" keyy="name" value="playcount" />
        </article>
        <br />
        <hr />
      </section>
    </>
  );
};

export default TreeMaps;
