import React, { useContext } from 'react';
import Pagination from './Pagination';
import useLastFmApi from '../hooks/useLasftFmApi';
import Loader from './Loader';
import HoverImage from './HoverImage';
import { LocalStateContext } from '../LocalStateContext';
import ErrorMessage from './ErrorMessage';

export default function RecentTracksTable() {
  const { recentTracksQuery } = useLastFmApi();
  const { state } = useContext(LocalStateContext);

  if (recentTracksQuery.isLoading) { return <Loader small={false} />; }
  if (state.recentTracksError) return <ErrorMessage error={state.recentTracksError} />;

  const recentTracks = recentTracksQuery.data;

  const bigContent = recentTracks.track.filter((x) => x.date).map((track, i) => {
    const smallImgSrc = track?.image?.[1]?.['#text'] ?? 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
    const bigImgSrc = track?.image?.[3]?.['#text'] ?? 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
    const date = track.date.uts;
    const unixDate = new Date(date * 1000);
    return (
    // eslint-disable-next-line react/no-array-index-key
      <tr key={i}>
        <td>
          <div className="imageCell">
            <a href={track.url} target="_blank" rel="noreferrer">
              <HoverImage src={smallImgSrc} popupSrc={bigImgSrc} caption={track.album['#text']} />
            </a>
          </div>
        </td>
        <td>{unixDate.toLocaleString()}</td>
        <td><i>{track.name}</i></td>
        <td><b>{track.artist['#text']}</b></td>
      </tr>
    );
  });

  const mobileContent = recentTracks.track.filter((x) => x.date).map((track, i) => {
    const url = track.image[2]['#text'].length > 0 ? track.image[2]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
    const date = track.date.uts;
    const unixDate = new Date(date * 1000);
    return (
    // eslint-disable-next-line react/no-array-index-key
      <tr key={i}>
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
