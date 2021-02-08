import React from 'react';
import { useModalState } from '../ModalContext';

type Props = {
    src: string,
    popupSrc: string,
    caption: string,
}

const HoverImage: React.FC<Props> = ((props: Props): JSX.Element => {
  console.log('hovering hoverImage');
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
      className="image"
      height="64"
      src={src}
    />
  );
});

export default HoverImage;
