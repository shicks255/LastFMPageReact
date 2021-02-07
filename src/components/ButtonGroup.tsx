import React from 'react';
import Button from './Button';

const ButtonGroup: React.FC<Record<string, void>> = (() => (
  <div className="menuButtons">
    <div className="column is-half is-offset-one-quarter has-text-centered">
      <Button id="recentButton" dataLabel="recent" title="Recent" />
      <Button id="topButton" dataLabel="top" title="Top" />
      <Button id="vis" dataLabel="vis" title="Visualization" />
    </div>
  </div>
));

export default ButtonGroup;
