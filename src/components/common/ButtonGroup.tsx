import React from 'react';

import { Link } from 'react-router-dom';

import { useApiState } from '@/contexts/ApiContext';

const ButtonGroup: React.FC<Record<string, void>> = () => {
  const { selected } = useApiState();

  const selectedTabClass = 'text-gray-200 bg-sky-900';
  const selectButtonClass = 'font-semibold';

  return (
    <div className="mx-auto rounded">
      <ul className="inline-flex w-full px-a">
        <li
          className={`px-4 py-2 border-r-2 rounded-t ${
            selected === 'recent' ? selectedTabClass : 'bg-slate-300'
          }`}
        >
          <Link to="/">
            <button
              id="recentButton"
              type="submit"
              className={`${selected === 'recent' ? selectButtonClass : ''}`}
            >
              Recents
            </button>
          </Link>
        </li>
        <li
          className={`px-4 py-2 border-r-2 rounded-t ${
            selected === 'top' ? selectedTabClass : 'bg-slate-300'
          }`}
        >
          <Link to="/top">
            <button
              id="topButton"
              type="submit"
              className={`${selected === 'top' ? selectButtonClass : ''}`}
            >
              Ranks
            </button>
          </Link>
        </li>
        <li
          className={`px-4 py-2 rounded-t ${
            selected === 'vis' ? selectedTabClass : ' bg-slate-300'
          }`}
        >
          <Link to="/visuals/tree">
            <button
              id="vis"
              type="submit"
              className={`${selected === 'vis' ? selectButtonClass : ''}`}
            >
              Visuals
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ButtonGroup;
