import React from 'react';

interface IProps {
  small?: boolean;
}

const Loader: React.FC<IProps> = ({ small }: IProps) => {
  let size = 'h-32 w-32';
  if (small) {
    size = 'h-16 w-16';
  }

  return (
    <div className="text-sky-900 flex justify-center align-center">
      <div>
        <img alt="" className={`${size} spin`} src={`${process.env.PUBLIC_URL}/disc_2.svg`} />
      </div>
    </div>
  );
};

export default Loader;
