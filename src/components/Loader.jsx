import React from 'react';

export default function Loader(props) {
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const clazz = (props && props.small) ? 'fa-5x' : 'fa-7x';

  return (
    <div style={{ color: '#C3073F' }}>
      <div className="has-text-centered">
        <i className={`fas fa-compact-disc ${clazz} fa-spin`} />
      </div>
    </div>
  );
}
