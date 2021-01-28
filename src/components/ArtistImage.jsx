/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { getActualArtistUrl } from '../utils';
import Loader from './Loader';

export default function ArtistImage(props) {
  const [url, setUrl] = useState('https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  const { mbid, artistName } = props;
  getActualArtistUrl(mbid, artistName)
    .then((res) => {
      console.log(res);
      setUrl(res);
      setLoading(false);
    });

  if (loading) return <Loader />;

  return (
    <img
      alt=""
      height={64}
      width={64}
      src={url}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    />
  );
}
//
// ArtistImage.propTypes = {
//   mbid: String,
//   artistName: String,
// };
//
// ArtistImage.defaultProps = {
//   mbid: '',
//   artistName: '',
// };
