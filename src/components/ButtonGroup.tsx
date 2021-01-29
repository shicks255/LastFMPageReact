import React from 'react';
import Button from './Button';

export default function ButtonGroup() {
  return (
    <div className="column is-half is-offset-one-quarter has-text-centered">
      <Button id="recentButton" dataLabel="recent" title="Recent" />
      <Button id="topButton" dataLabel="top" title="Top" />
      <Button id="vis" dataLabel="vis" title="Visualization" />
    </div>
  );
}
