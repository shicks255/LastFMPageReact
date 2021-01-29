import React from 'react';
import Pagination from './Pagination';
import useLastFmApi from '../useLasftFmApi';
import Loader from './Loader';

export default function RecentTracksTable() {
  const { recentTracksQuery } = useLastFmApi();

  if (recentTracksQuery.isLoading) { return <Loader small={false} />; }

  const recentTracks = recentTracksQuery.data;

  const bigContent = recentTracks.track.filter((x) => x.date).map((track, i) => {
    const url = track.image[1]['#text'].length > 0 ? track.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
    const date = track.date.uts;
    const unixDate = new Date(date * 1000);
    return (
      <tr key={track.date.uts}>
        <td>
          <div className="imageCell">
            <a href={track.url} target="_blank" rel="noreferrer">
              <img
                alt=""
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
                className="image"
                height="64"
                src={url}
              />
            </a>
          </div>
        </td>
        <td>{unixDate.toLocaleString()}</td>
        <td><i>{track.name}</i></td>
        <td><b>{track.artist['#text']}</b></td>
      </tr>
    );
  });

  const mobileContent = recentTracks.track.filter((x) => x.date).map((track) => {
    const url = track.image[1]['#text'].length > 0 ? track.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
    const date = track.date.uts;
    const unixDate = new Date(date * 1000);
    return (
      <tr key={track.date.uts}>
        <td>
          <a href={track.url} target="_blank" rel="noreferrer">
            <div className="imageCell">
              <img alt="" className="image" height="64" width="64" src={url} />
            </div>
          </a>
        </td>
        <td>
          {unixDate.toLocaleString()}
          <br />
          <i>{track.name}</i>
          <br />
          <b>{track.artist['#text']}</b>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Pagination totalPages={recentTracks['@attr'].totalPages} />
      <div>
        <table className="table is-striped is-hoverable is-fullwidth is-hidden-tablet">
          <tbody>
            {mobileContent}
          </tbody>
        </table>

        <table className="table is-striped is-hoverable is-fullwidth is-hidden-mobile">
          <thead className="tableHead">
            <tr>
              <th aria-label="Rank Header" />
              <th>Date</th>
              <th>Name</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {bigContent}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={recentTracks['@attr'].totalPages} />
    </div>
  );
}
