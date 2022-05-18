import React from 'react';

import { useModalState } from '@/contexts/ModalContext';

const ImageModal: React.FC<Record<string, void>> = () => {
  const { state } = useModalState();

  if (!state.modalImageSrc) return <div />;

  return (
    <div className="fixed top-10">
      <img alt="" src={state.modalImageSrc} />
      <span style={{ color: 'black' }}>
        <b>{state.modalImageCaption}</b>
      </span>
    </div>
  );
};

export default ImageModal;
