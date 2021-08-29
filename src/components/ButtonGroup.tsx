import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ButtonGroup: React.FC<Record<string, void>> = (() => (
  <div className="menuButtons">
    <div className="column flex-buttons is-half is-offset-one-quarter has-text-centered">
      <Link to="/">
        <Button id="recentButton" dataLabel="recent" />
      </Link>
      <Link to="/top">
        <Button id="topButton" dataLabel="top" />
      </Link>
      <Link to="/visuals/tree">
        <Button id="vis" dataLabel="vis" />
      </Link>
    </div>
  </div>
));

export default ButtonGroup;
