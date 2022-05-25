import React, { useState } from 'react';

interface IProps {
  src: string;
  popupSrc: string;
  caption: string;
}

const HoverImage: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { src, popupSrc, caption } = props;
  const [showBig, setShowBig] = useState(false);

  let image = (
    <img
      loading="lazy"
      alt={caption}
      onMouseEnter={() => setShowBig(true)}
      className="image w-16"
      height="64"
      src={src}
    />
  );

  if (showBig) {
    image = (
      <img
        loading="lazy"
        alt={caption}
        onMouseLeave={() => setShowBig(false)}
        className="image w-80"
        height="64"
        src={popupSrc}
      />
    );
  }

  return image;
};

export default HoverImage;
