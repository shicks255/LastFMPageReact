import React from 'react';
import useLastFmApi from '../useLasftFmApi';
import Loader from './Loader';

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

  return (
    <img
      alt=""
      height={64}
      width={64}
      src={result.data}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    />
  );
}

export default ArtistImage;
