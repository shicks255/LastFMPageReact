import React from 'react';

export default function Loader() {
  return (
    <div style={{ color: '#C3073F' }}>
      <div>
        <i className="fas fa-compact-disc fa-7x fa-spin" />
        <br />
        <br />
        <span style={{ color: 'white' }}>Loading...</span>
      </div>
    </div>
  );
}
