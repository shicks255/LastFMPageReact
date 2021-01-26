import React from 'react';

export default function LoadingModal() {
  return (
    <div className="modal is-active">
      <div className="modal-background">  </div>
      <div className="modal-content" style={{ color: '#C3073F' }}>
        <div>
          <i className="fas fa-compact-disc fa-7x fa-spin" />
          <br />
          <br />
          <span style={{ color: 'white' }}>Loading...</span>
        </div>
      </div>
    </div>
  );
}
