import React from 'react';

type Props = {
    small: boolean
}

function Loader(props: Props) {
  const { small } = props;
  const clazz = small ? 'fa-5x' : 'fa-7x';

  return (
    <div style={{ color: '#C3073F' }}>
      <div className="has-text-centered">
        <i className={`fas fa-compact-disc ${clazz} fa-spin`} />
      </div>
    </div>
  );
}

export default Loader;
