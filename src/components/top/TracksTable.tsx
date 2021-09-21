import React from 'react';
import Pagination from '../Pagination';
import Loader from '../Loader';
import { convertDurationToTimestamp } from '../../utils';
import ArtistImage from '../ArtistImage';
import ErrorMessage from '../ErrorMessage';
import useIsMobile from '../../hooks/useIsMobile';
import { useApiState } from '../../contexts/ApiContext';
import { useTopTracks } from '../../hooks/useLasftFmApi';

const TracksTable: React.FC<Record<string, void>> = ((): JSX.Element => {
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const {
    isLoading, error, data,
  } = useTopTracks(topItemsTimeFrame, topItemsPage);
  const isMobile = useIsMobile();

  if (isLoading) { return <Loader small={false} />; }
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <ErrorMessage error={new Error('')} />;

  const topTracks = data;
  const tracks = topTracks.track;

  if (!tracks) return <Loader small={false} />;

  function renderTable() {
    if (isMobile) {
      return (
        <>
          <thead>
            <tr>
              <th aria-label="Rank Header" />
              <th aria-label="Image Header" />
              <th>Name</th>
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
                  <td>
                    <a href={val.url} target="_blank" rel="noreferrer">{val.name}</a>
                    <br />
                    {val.artist.name}
                  </td>
                  <td>{val.playcount}</td>
                  <td>
                    {time}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </>
      );
    }
    return (
      <>
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th className="text-left">Name</th>
            <th className="text-left">Artist</th>
            <th className="text-right">Plays</th>
            <th className="text-right">Length</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((val) => {
            const time = convertDurationToTimestamp(val.duration);

            const title = val.name;
            const { rank } = val['@attr'];
            return (
              <tr key={title} className="hover:bg-gray-400">
                <td className="font-semibold text-right">
                  {rank}
                </td>
                <td>
                  <div className="imageCell">
                    <a href={val.url} target="_blank" rel="noreferrer">
                      <ArtistImage mbid={val.artist.mbid} artistName={val.artist.name} />
                    </a>
                  </div>
                </td>
                <td><a href={val.url} target="_blank" rel="noreferrer"><i>{val.name}</i></a></td>
                <td className="font-semibold">{val.artist.name}</td>
                <td className="text-right">{val.playcount}</td>
                <td className="text-right">{time}</td>
              </tr>
            );
          })}
        </tbody>
      </>
    );
  }

  return (
    <div>
      <Pagination page={topItemsPage} totalPages={topTracks['@attr'].totalPages} />
      <table className="table-auto">
        {renderTable()}
      </table>
      <Pagination page={topItemsPage} totalPages={topTracks['@attr'].totalPages} />
    </div>
  );
});

export default TracksTable;
