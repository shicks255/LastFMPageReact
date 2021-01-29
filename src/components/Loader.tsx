import React from 'react';

type Props = {
    small: boolean
}

function Loader(props: Props) {
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const clazz = (props && props.small) ? 'fa-5x' : 'fa-7x';

  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <div style={{ color: '#C3073F' }}>
      <div className="has-text-centered">
        <i className={`fas fa-compact-disc ${clazz} fa-spin`} />
      </div>
    </div>
  );
}

export default Loader;
