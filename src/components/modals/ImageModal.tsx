import React, { useContext } from 'react';
import { LocalStateContext } from '../../LocalStateContext';

export default function ImageModal() {
  const { state } = useContext(LocalStateContext);

  if (!state.modalImageSrc) return <div />;

  return (
    <div className="active imagePopup box">
      <img alt="" src={state.modalImageSrc} />
      <span style={{ color: 'black' }}>
        <b>{state.modalImageCaption}</b>
      </span>
    </div>
  );
}
