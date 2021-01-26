import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';
import { strategies, timeFrames } from '../utils';

export default function MainMenu() {
  const { state, actions } = useContext(LocalStateContext);

  const strategySelects = Object.keys(strategies)
    .map((value) => <option key={value} value={value}>{strategies[value]}</option>);
  const timeFrameSelects = Object.keys(timeFrames)
    .map((value) => <option key={value} value={value}>{timeFrames[value]}</option>);

  return (
    <div className="columns is-mobile">
      <div className="box column is-half is-offset-one-quarter">
        <table className="menuTable">
          <tbody>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <td><label>Select</label></td>
              <td>
                <select
                  defaultValue={state.strategy}
                  onChange={(event) => actions.setStrategy(event.target.value)}
                >
                  {strategySelects}
                </select>
              </td>
            </tr>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <td><label>Time Frame:</label></td>
              <td>
                <select
                  defaultValue={state.timeFrame}
                  onChange={(event) => actions.setTimeFrame(event.target.value)}
                >
                  {timeFrameSelects}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
