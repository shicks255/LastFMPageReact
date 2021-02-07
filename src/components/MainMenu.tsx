import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';
import { strategies, timeFrames } from '../utils';

const MainMenu: React.FC<Record<string, void>> = (() => {
  const { state, actions } = useContext(LocalStateContext);

  const strategySelects = Object.keys(strategies)
    .map((value) => <option key={value} value={value}>{strategies[value]}</option>);
  const timeFrameSelects = Object.keys(timeFrames)
    .map((value) => <option key={value} value={value}>{timeFrames[value]}</option>);

  if (state.selected !== 'top') return <></>;

  return (
    <div className="is-mobile">
      <div className="box column is-half is-offset-one-quarter has-text-centered">
        <div className="columns has-text-black">
          <div className="column">
            <span>
              <b>View:</b>
              <br />
              <div className="select is-danger">
                <select
                  defaultValue={state.strategy}
                  onChange={(event) => actions.setStrategy(event.target.value)}
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
                defaultValue={state.timeFrame}
                onChange={(event) => actions.setTimeFrame(event.target.value)}
              >
                {timeFrameSelects}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MainMenu;
