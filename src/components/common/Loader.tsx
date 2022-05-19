import React from 'react';

interface IProps {
  small: boolean;
}

const Loader: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { small } = props;
  const clazz = small ? 'fa-5x' : 'fa-7x';

  return (
    <div className="text-sky-900">
      <div className="">
        <i className={`fas fa-compact-disc ${clazz} fa-spin`} />
      </div>
    </div>
  );
};

export default Loader;