import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';

export default function Button(props) {
  const { state, actions } = useContext(LocalStateContext);

  const { id, dataLabel, title } = props;

  let classs = 'fas fa-5x clicky';
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
      <i
        id={id}
        onClick={() => actions.setSelected(dataLabel)}
        className={classs}
        aria-hidden="true"
      />
      <br />
      <b>{title}</b>
    </div>
  );
}

Button.propTypes = {
  id: String,
  dataLabel: String,
  title: String,
};

Button.defaultProps = {
  id: '',
  dataLabel: '',
  title: '',
};
