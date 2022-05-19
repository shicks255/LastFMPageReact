import React from 'react';

import { useApiDispatch, useApiState } from '@/contexts/ApiContext';

interface IProps {
  id: string;
  dataLabel: string;
}

const Button: React.FC<IProps> = (props: IProps) => {
  const { selected } = useApiState();
  const { setSelected } = useApiDispatch();

  const { id, dataLabel } = props;

  let classs = 'fas fa-5x clicky2';
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

  if (selected === dataLabel) {
    classs += ' selected';
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <i
        id={id}
        onClick={() => setSelected(dataLabel)}
        // className={classs}
        aria-hidden="true"
      />
      <br />
      Test
    </div>
  );
};

export default Button;