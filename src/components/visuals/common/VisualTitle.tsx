import React from 'react';

interface IProps {
  title: string;
}

const VisualTitle: React.FC<IProps> = ({ title }: IProps) => {
  return (
    <section>
      <div className="text-left text-2xl mb-2 font-semibold">{title}</div>
    </section>
  );
};

export default VisualTitle;
