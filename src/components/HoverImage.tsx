import React from 'react';

import { useModalState } from '@/contexts/ModalContext';

interface IProps {
  src: string;
  popupSrc: string;
  caption: string;
}

const HoverImage: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { actions } = useModalState();
  const { src, popupSrc, caption } = props;

  function handleHoverIn() {
    actions.setModalImageSrc(popupSrc);
    actions.setModalImageCaption(caption);
  }

  function handleHoverOut() {
    actions.setModalImageSrc('');
    actions.setModalImageCaption('');
  }

  return (
    <img
      alt=""
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
      className="image w-16"
      height="64"
      src={src}
    />
  );
};

export default HoverImage;
