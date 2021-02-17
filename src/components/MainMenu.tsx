import React from 'react';
import { strategies, timeFrames } from '../utils';
import { useApiDispatch, useApiState } from '../contexts/ApiContext';

const MainMenu: React.FC<Record<string, void>> = (() => {
  const { selected, strategy, timeFrame } = useApiState();
  const { setStrategy, setTimeFrame } = useApiDispatch();

  const strategySelects = Object.keys(strategies)
    .map((value) => <option key={value} value={value}>{strategies[value]}</option>);
  const timeFrameSelects = Object.keys(timeFrames)
    .map((value) => <option key={value} value={value}>{timeFrames[value]}</option>);

  if (selected !== 'top') return <></>;

  return (
    <>
      <section className="mainContent marginBottom">
        <h1 className="title myTitle has-text-centered">Top Charts</h1>
      </section>
      <div className="is-mobile">
        <div className="box column is-half is-offset-one-quarter has-text-centered">
          <div className="columns has-text-black">
            <div className="column">
              <span>
                <b>View:</b>
                <br />
                <div className="select is-danger">
                  <select
                    defaultValue={strategy}
                    onChange={(event) => setStrategy(event.target.value)}
                  >
                    {strategySelects}
                  </select>
                </div>
              </span>
            </div>
            <div className="column">
              <b>Time Frame:</b>
              <br />
              <div className="select is-danger">
                <select
                  defaultValue={timeFrame}
                  onChange={(event) => setTimeFrame(event.target.value)}
                >
                  {timeFrameSelects}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default MainMenu;
