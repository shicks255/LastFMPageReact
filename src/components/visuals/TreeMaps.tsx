import React from 'react';

import { timeFrames } from '../../utils';
import VisualTitle from './common/VisualTitle';
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
