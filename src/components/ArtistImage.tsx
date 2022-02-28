import React from 'react';
import Loader from './Loader';
import HoverImage from './HoverImage';
import useArtistImage from '../hooks/api/useArtistImage';

type Props = {
  mbid: string,
  artistName: string
}

const ArtistImage: React.FC<Props> = ((props: Props) => {
  const { mbid, artistName } = props;
  const { isLoading, data } = useArtistImage(mbid, artistName);

  if (isLoading) return <Loader small />;
  const src = data ?? 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

  return <HoverImage src={src} popupSrc={src} caption={artistName} />;
});

export default ArtistImage;
