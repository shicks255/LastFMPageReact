import React from 'react';
import Pagination from './Pagination';
import Loader from './Loader';
import HoverImage from './HoverImage';
import ErrorMessage from './ErrorMessage';
import useIsMobile from '../hooks/useIsMobile';
import { useApiState } from '../ApiContext';
import { useRecentTracks } from '../hooks/useLasftFmApi';

const RecentTracksTable: React.FC<Record<string, void>> = (() => {
  const { page } = useApiState();
  const {
    isLoading, error, data,
  } = useRecentTracks(page);
  const isMobile = useIsMobile();

  if (isLoading) return <Loader small={false} />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <ErrorMessage error={new Error('')} />;

  const recentTracks = data;

  function renderTable() {
    if (isMobile) {
      return (
        <tbody>
          {recentTracks.track.filter((x) => x.date).map((track, i) => {
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
          })}
        </tbody>
      );
    }
    return (
      <>
        <thead className="tableHead">
          <tr>
            <th aria-label="Rank Header" />
            <th>Date</th>
            <th>Name</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {recentTracks.track.filter((x) => x.date).map((track, i) => {
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
          })}
        </tbody>
      </>
    );
  }

  return (
    <div className="mainContent">
      <Pagination totalPages={recentTracks['@attr'].totalPages} />
      <div>
        <table className="table is-striped is-hoverable is-fullwidth">
          {renderTable()}
        </table>
      </div>
      <Pagination totalPages={recentTracks['@attr'].totalPages} />
    </div>
  );
});

export default RecentTracksTable;
