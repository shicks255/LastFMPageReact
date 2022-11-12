import React from 'react';

interface IProps {
  onChange: (e: string) => void;
  value: string;
}

const ResourceSelect: React.FC<IProps> = ({ onChange, value }: IProps) => {
  return (
    <select
      className="px-3 py-1.5 md:w-32 w-full
                    rounded border border-solid
                    border-gray-300 transition ease-in-out bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="album" key="album">
        Albums
      </option>
      <option value="artist" key="artist">
        Artists
      </option>
    </select>
  );
};

export default ResourceSelect;
