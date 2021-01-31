import React from 'react';
import useLastFmApi from '../hooks/useLasftFmApi';
import Loader from './Loader';
import HoverImage from './HoverImage';

type Props = {
  mbid: string,
  artistName: string
}

function ArtistImage(props: Props) {
  const { artistImageQuery } = useLastFmApi();

  const { mbid, artistName } = props;
  const result = artistImageQuery(mbid, artistName);

  // eslint-disable-next-line react/jsx-filename-extension
  if (result.isLoading) return <Loader small />;
  const src = result.data;

  return (
    <HoverImage src={src} popupSrc={src} caption={artistName} />
  );
}

export default ArtistImage;
