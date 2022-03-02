import React from 'react';

import { convertDurationToTimestamp, trimString } from '../../utils';
import ArtistImage from '../ArtistImage';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import Pagination from '../Pagination';
import { useApiState } from '@/contexts/ApiContext';
import useTopTracks from '@/hooks/api/lastFm/useTopTracks';
import useIsMobile from '@/hooks/useIsMobile';

const TracksTable: React.FC<Record<string, void>> = (): JSX.Element => {
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const { isLoading, error, data } = useTopTracks(topItemsTimeFrame, topItemsPage);
  const isMobile = useIsMobile();

  if (isLoading) {
    return <Loader small={false} />;
  }
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <ErrorMessage error={new Error('')} />;

  const topTracks = data.toptracks;
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
              <th className="text-left">Name</th>
              <th className="text-right p-4">Plays</th>
              <th className="text-right">Length</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((val) => {
              const time = convertDurationToTimestamp(val.duration);

              const title = val.name;
              const rank = val?.['@attr']?.rank;
              return (
                <tr key={title}>
                  <td className="font-semibold text-right pr-4">{rank}</td>
                  <td className="p-2">
                    <div className="imageCell pr-2">
                      <a href={val.url} target="_blank" rel="noreferrer">
                        <ArtistImage mbid={val.artist.mbid} artistName={val.artist.name} />
                      </a>
                    </div>
                  </td>
                  <td>
                    <i>{trimString(val.name, 45)}</i>
                    <br />
                    <span className="font-semibold">{trimString(val.artist.name, 45)}</span>
                  </td>
                  <td className="text-right pr-4">{val.playcount}</td>
                  <td className="text-right">{time}</td>
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
            <th className="text-right pr-10">Plays</th>
            <th className="text-right">Length</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((val) => {
            const time = convertDurationToTimestamp(val.duration);

            const title = val.name;
            const rank = val['@attr']?.rank;
            return (
              <tr key={title} className="hover:bg-gray-400">
                <td className="font-semibold text-right pr-4">{rank}</td>
                <td className="p-2">
                  <div className="imageCell pr-2">
                    <a href={val.url} target="_blank" rel="noreferrer">
                      <ArtistImage mbid={val.artist.mbid} artistName={val.artist.name} />
                    </a>
                  </div>
                </td>
                <td>
                  <i>{trimString(val.name)}</i>
                </td>
                <td className="font-semibold">{trimString(val.artist.name, 45)}</td>
                <td className="text-right pr-10">{val.playcount}</td>
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
      <table className="table-auto">{renderTable()}</table>
      <Pagination page={topItemsPage} totalPages={topTracks['@attr'].totalPages} />
    </div>
  );
};

export default TracksTable;
