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
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content" style={{ color: '#C3073F' }}>
        <div className="card">
          <div className="card-content">
            <Loader small={false} />
            <progress className="progress" value={done} max={total}>
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
