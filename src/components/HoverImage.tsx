import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';

type Props = {
    src: string,
    popupSrc: string,
    caption: string,
}

const HoverImage: React.FC<Props> = ((props: Props): JSX.Element => {
  const { actions } = useContext(LocalStateContext);
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
