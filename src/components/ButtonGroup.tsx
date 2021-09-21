import React from 'react';
import { Link } from 'react-router-dom';
import { useApiState } from '../contexts/ApiContext';

const ButtonGroup: React.FC<Record<string, void>> = function t() {
  const { selected } = useApiState();

  const selectedTabClass = 'text-gray-800 bg-gray-300';
  const selectButtonClass = 'font-semibold';

  return (
    <div className="1-1/2 mx-auto rounded">
      <ul className="inline-flex w-full px-a">
        <li className={`px-4 py-2 bg-gray-100 rounded-t ${selected === 'recent' ? selectedTabClass : ''}`}>
          <Link to="/">
            <button id="recentButton" type="submit" className={`${selected === 'recent' ? selectButtonClass : ''}`}>
              Recents
            </button>
          </Link>
        </li>
        <li className={`px-4 py-2 bg-gray-100 rounded-t ${selected === 'top' ? selectedTabClass : ''}`}>
          <Link to="/top">
            <button id="topButton" type="submit" className={`${selected === 'top' ? selectButtonClass : ''}`}>
              Ranks
            </button>
          </Link>
        </li>
        <li className={`px-4 py-2 bg-gray-100 rounded-t ${selected === 'vis' ? selectedTabClass : ''}`}>
          <Link to="/visuals/tree">
            <button id="vis" type="submit" className={`${selected === 'vis' ? selectButtonClass : ''}`}>
              Visuals
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ButtonGroup;
