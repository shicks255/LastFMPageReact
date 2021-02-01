import React from 'react';
import useLastFmApi from '../hooks/useLasftFmApi';
import Loader from './Loader';
import HoverImage from './HoverImage';

type Props = {
  mbid: string,
  artistName: string
}

const ArtistImage: React.FC<Props> = ((props: Props) => {
  const { artistImageQuery } = useLastFmApi();

  const { mbid, artistName } = props;
  const result = artistImageQuery(mbid, artistName);

  if (result.isLoading) return <Loader small />;
  const src = result.data ?? 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

  return <HoverImage src={src} popupSrc={src} caption={artistName} />;
});

export default ArtistImage;
