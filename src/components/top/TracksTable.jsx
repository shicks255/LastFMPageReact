/* eslint-disable no-unused-vars */
import React from 'react';
import useLastFmApi from '../../useLasftFmApi';
import Pagination from '../Pagination';
import Loader from '../Loader';

export default function TracksTable() {
  const fanartKey = process.env.REACT_APP_FANART_KEY;

  const { topTracksQuery } = useLastFmApi();

  if (topTracksQuery.isLoading) { return <Loader />; }

  const topTracks = topTracksQuery.data;

  function getFanArtImage(mbid, index, val, secondTry) {
    let imageUrl = '';
    const url = `https://webservice.fanart.tv/v3/music/${mbid}&api_key=${fanartKey}&format=json`;
    let picture = document.getElementById(`trackImage_${index}`);
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
          // eslint-disable-next-line no-use-before-define
          getMusicBrainzId(val, index);
          return;
        }

        picture = document.getElementById(`trackImage_${index}`);
        if (imageUrl.length > 0) { picture.src = imageUrl; } else { picture.src = ''; }
      });
  }

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
          getFanArtImage(mbid, index, val, true);
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

  const bigContent = topTracks.track.map((val, index) => {
    const min = Math.floor(val.duration / 60);
    const sec = val.duration - (min * 60);
    const secString = sec < 10 ? `0${sec.toString()}` : sec.toString();
    const time = `${min}:${secString.substr(0, 2)}`;

    const title = val.name;
    const { rank } = val['@attr'];
    return (
      <tr key={title}>
        <td className="alignRight">
          {rank}
          .
        </td>
        <td>
          <div className="imageCell">
            <a href={val.url} target="_blank" rel="noreferrer">
              <img
                alt=""
                width={64}
                id={`trackImage_${index}`}
                height={64}
                src=""
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              />
            </a>
          </div>
        </td>
        <td><a href={val.url} target="_blank" rel="noreferrer">{val.name}</a></td>
        <td>{val.artist.name}</td>
        <td>{val.playcount}</td>
        <td>{time}</td>
      </tr>
    );
  });

  const mobileContent = topTracks.track.map((val, index) => {
    const min = Math.floor(val.duration / 60);
    const sec = val.duration - (min * 60);
    const secString = sec < 10 ? `0${sec.toString()}` : sec.toString();
    const time = `${min}:${secString.substr(0, 2)}`;

    const title = val.name;
    const { rank } = val['@attr'];
    return (
      <tr key={title}>
        <td className="alignRight">
          {rank}
          .
        </td>
        <td>
          <div className="imageCell">
            <a href={val.url} target="_blank" rel="noreferrer">
              <img
                alt=""
                id={`trackImage_${index}`}
                width={64}
                height={64}
                src=""
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              />
            </a>
          </div>
        </td>
        <td>
          <a href={val.url} target="_blank" rel="noreferrer">{val.name}</a>
          <br />
          {val.artist.name}
          <br />
          {time}
        </td>
        <td>{val.playcount}</td>
      </tr>
    );
  });

  // topTracks.forEach((value, index) => getActualArtistUrl(value.artist, index));

  return (
    <div>
      <Pagination totalPages={topTracks['@attr'].totalPages} />
      <table className="table is-striped is-hoverable is-fullwidth is-hidden-mobile">
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th>Name</th>
            <th>Artist</th>
            <th>Plays</th>
            <th>Length</th>
          </tr>
        </thead>

        <tbody>
          {bigContent}
        </tbody>
      </table>
      <table className="table is-striped is-hoverable is-fullwidth is-hidden-tablet">
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th aria-label="Info Header" />
            <th>Plays</th>
          </tr>
        </thead>

        <tbody>
          {mobileContent}
        </tbody>
      </table>
      <Pagination totalPages={topTracks['@attr'].totalPages} />
    </div>
  );
}
