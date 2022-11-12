import React from 'react';

interface IProps {
  small: boolean;
}

const Loader: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { small } = props;
  const clazz = small ? 'fa-5x' : 'fa-7x';
  console.log(clazz);

  return (
    <div className="text-sky-900">
      <div>
        <img alt="" className="h-32 w-32 spin" src={`${process.env.PUBLIC_URL}/disc_2.svg`} />
      </div>
    </div>
  );
};

export default Loader;
