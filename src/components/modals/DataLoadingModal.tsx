import React from 'react';

interface Props {
    done: number,
    total: number,
    message: string,
}

export default function DataLoadingModal(props: Props) {
  const {
    done,
    total,
    message,
  } = props;
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content" style={{ color: '#C3073F' }}>
        <div className="card">
          <div className="card-content">
            <i className="fas fa-compact-disc fa-7x fa-spin" />
            <progress
              className="progress"
              value={done}
              max={total}
            >
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
}
