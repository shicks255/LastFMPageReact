import React, { useContext } from 'react';
import useLastFmApi from '../../hooks/useLasftFmApi';
import Pagination from '../Pagination';
import Loader from '../Loader';
import { convertDurationToTimestamp } from '../../utils';
import ArtistImage from '../ArtistImage';
import { LocalStateContext } from '../../LocalStateContext';
import ErrorMessage from '../ErrorMessage';
import useIsMobile from '../../hooks/useIsMobile';

const TracksTable: React.FC<Record<string, void>> = ((): JSX.Element => {
  const { topTracksQuery } = useLastFmApi();
  const { state } = useContext(LocalStateContext);
  const isMobile = useIsMobile();

  if (topTracksQuery.isLoading) { return <Loader small={false} />; }
  if (state.topTracksError) return <ErrorMessage error={state.topTracksError} />;

  const topTracks = topTracksQuery.data;
  const tracks = topTracks.track;

  if (!tracks) return <Loader small={false} />;

  function renderTable() {
    if (isMobile) {
      return (
        <tbody>
          {tracks.map((val) => {
            const time = convertDurationToTimestamp(val.duration);

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
                      <ArtistImage mbid={val.artist.mbid} artistName={val.artist.name} />
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
          })}
        </tbody>
      );
    }
    return (
      <>
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
          {tracks.map((val) => {
            const time = convertDurationToTimestamp(val.duration);

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
                      <ArtistImage mbid={val.artist.mbid} artistName={val.artist.name} />
                    </a>
                  </div>
                </td>
                <td><a href={val.url} target="_blank" rel="noreferrer">{val.name}</a></td>
                <td>{val.artist.name}</td>
                <td>{val.playcount}</td>
                <td>{time}</td>
              </tr>
            );
          })}
        </tbody>
      </>
    );
  }

  return (
    <div>
      <Pagination totalPages={topTracks['@attr'].totalPages} />
      <table className="table is-striped is-hoverable is-fullwidth mainContent">
        {renderTable()}
      </table>
      <Pagination totalPages={topTracks['@attr'].totalPages} />
    </div>
  );
});

export default TracksTable;
