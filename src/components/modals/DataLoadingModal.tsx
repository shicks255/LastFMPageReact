import React from 'react';

import Loader from '../common/Loader';

interface IProps {
  done: number;
  total: number;
  message: string;
}

const DataLoadingModal: React.FC<IProps> = (props: IProps) => {
  const { done, total, message } = props;
  return (
    <div>
      <div style={{ color: '#C3073F' }}>
        <div>
          <div>
            <Loader />
            <progress value={done} max={total}>
              0
            </progress>
            Loading your last.fm scrobbles
            <br />
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataLoadingModal;
