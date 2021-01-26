/* eslint-disable no-unused-vars */
import React from 'react';
import useLastFmApi from '../../useLasftFmApi';
import Pagination from '../Pagination';
import Loader from '../Loader';

export default function ArtistTable() {
  const fanartKey = process.env.REACT_APP_FANART_KEY;

  const { topArtistsQuery } = useLastFmApi();

  if (topArtistsQuery.isLoading) { return <Loader />; }

  const topArtists = topArtistsQuery.data;

  function getMusicBrainzId(val, index) {
    const fullName = encodeURI(val.name);
    fetch(`https://musicbrainz.org/ws/2/artist/?query=${fullName}&fmt=json`,
      {
        headers: {
          'User-Agent': 'SteveFM/1.0 https:\\/\\/music.stevenmhicks.com shicks255@yahoo.com',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.artists) {
          const mbid = res.artists[0].id;
          // eslint-disable-next-line no-use-before-define
          getFanArtImage(mbid, index, val, true);
        }
      });
  }

  function getFanArtImage(mbid, index, val, secondTry) {
    let imageUrl = '';
    const url = `https://webservice.fanart.tv/v3/music/${mbid}&?api_key=${fanartKey}&format=json`;
    let picture = document.getElementById(`artistImage_${index}`);
    if (picture) { picture.src = ''; }
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.artistthumb) {
          imageUrl = res.artistthumb[0].url;
        } else if (res.artistbackground) {
          imageUrl = res.artistbackground[0].url;
        } else if (res.hdmusiclogo) {
          imageUrl = res.hdmusiclogo[0].url;
        } else if (res.musiclogo) {
          imageUrl = res.musiclogo[0].url;
        } else if (res.albums) {
          const albums = Object.keys(res.albums);
          const firstAlbum = albums[0];
          if (res.albums[firstAlbum]) { imageUrl = res.albums[firstAlbum].albumcover[0].url; }
        } else
        if (!secondTry) {
          getMusicBrainzId(val, index);
          return;
        }

        picture = document.getElementById(`artistImage_${index}`);
        if (picture) {
          if (imageUrl.length > 0) { picture.src = imageUrl; } else { picture.src = ''; }
        }
      });
  }

  function getActualArtistUrl(val, index) {
    if (val.mbid.length > 0) {
      getFanArtImage(val.mbid, index, val);
    } else {
      getMusicBrainzId(val, index);
    }
  }

  const content = topArtists.artist.map((val, index) => {
    const artistName = val.name;
    const { rank } = val['@attr'];
    return (
      <tr key={artistName}>
        <td className="alignRight">{rank}</td>
        <td>
          <div className="imageCell">
            <a target="_blank" href={val.url} rel="noreferrer">
              <img
                alt=""
                id={`artistImage_${index}`}
                height={64}
                width={64}
                src=""
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              />
            </a>
          </div>
        </td>
        <td><a target="_blank" href={val.url} rel="noreferrer"><b>{val.name}</b></a></td>
        <td>{val.playcount}</td>
      </tr>
    );
  });

  // topArtists.artist.forEach((val, index) => getActualArtistUrl(val, index));

  return (
    <div>
      <Pagination totalPages={topArtists['@attr'].totalPages} />
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th>Name</th>
            <th>Plays</th>
          </tr>
        </thead>

        <tbody>
          {content}
        </tbody>
      </table>
      <Pagination totalPages={topArtists['@attr'].totalPages} />
    </div>
  );
}
