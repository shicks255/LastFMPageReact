import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="text-sky-900 flex justify-center align-center">
      <div>
        <img alt="" className="h-32 w-32 spin" src={`${process.env.PUBLIC_URL}/disc_2.svg`} />
      </div>
    </div>
  );
};

export default Loader;
