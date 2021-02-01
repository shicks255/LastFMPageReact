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
    <div className="columns is-mobile">
      <div className="box column is-half is-offset-one-quarter has-text-centered">
        <table className="menuTable">
          <tbody>
            <tr>
              <td><b>View:</b></td>
              <td>
                <div className="select is-rounded">
                  <select
                    defaultValue={state.strategy}
                    onChange={(event) => actions.setStrategy(event.target.value)}
                  >
                    {strategySelects}
                  </select>
                </div>
              </td>
            </tr>
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
                  <select
                    defaultValue={state.timeFrame}
                    onChange={(event) => actions.setTimeFrame(event.target.value)}
                  >
                    {timeFrameSelects}
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default MainMenu;
