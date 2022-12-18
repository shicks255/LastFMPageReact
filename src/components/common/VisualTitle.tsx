import React from 'react';

interface IProps {
  title: string;
  noMargin?: boolean;
}

const VisualTitle: React.FC<IProps> = ({ title, noMargin }: IProps) => {
  return (
    <section>
      <div className={`text-left text-2xl ${noMargin ? '' : 'mb-2'} font-semibold`}>{title}</div>
    </section>
  );
};

export default VisualTitle;
