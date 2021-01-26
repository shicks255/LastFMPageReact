import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';

export default function Button(props) {
  const { state, actions } = useContext(LocalStateContext);

  // eslint-disable-next-line react/prop-types
  const { id, dataLabel, title } = props;

  let classs = 'fas fa-5x clicky';
  // eslint-disable-next-line react/prop-types
  switch (props.id) {
    case 'recentButton':
      classs += ' fa-history';
      break;
    case 'topButton':
      classs += ' fa-trophy';
      break;
    case 'vis':
      classs += ' fa-chart-bar';
      break;
    default:
      classs += '';
  }

  if (state.selected === dataLabel) { classs += ' selected'; }

  return (
    <div style={{ display: 'inline-block' }}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, */}
      {/* eslint-disable jsx-a11y/no-static-element-interactions */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <i
        id={id}
        onClick={() => actions.setSelected(dataLabel)}
        className={classs}
      />
      <br />
      <b>{title}</b>
    </div>
  );
}
