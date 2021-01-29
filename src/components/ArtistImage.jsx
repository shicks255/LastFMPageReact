import React from 'react';
import Loader from './Loader';
import useLastFmApi from '../useLasftFmApi';

export default function ArtistImage(props) {
  const { artistImageQuery } = useLastFmApi();

  const { mbid, artistName } = props;
  const result = artistImageQuery(mbid, artistName);

  if (result.loading) return <Loader small />;

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

ArtistImage.propTypes = {
  mbid: String,
  artistName: String,
};

ArtistImage.defaultProps = {
  mbid: '',
  artistName: '',
};
