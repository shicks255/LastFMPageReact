/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Pagination from '../Pagination';
import Loader from '../Loader';
import ArtistImage from '../ArtistImage';
import ErrorMessage from '../ErrorMessage';
import { useApiState } from '../../contexts/ApiContext';
import { trimString } from '../../utils';
import useTopArtists from '../../hooks/api/lastFm/useTopArtists';

const ArtistTable: React.FC<Record<string, void>> = (() => {
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const {
    isLoading, error, data,
  } = useTopArtists(topItemsTimeFrame, topItemsPage);

  if (isLoading) {
    return <Loader small={false} />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return <div>ahh</div>;

  const artist = data;
  const artists = artist.artist;

  function renderTable() {
    return (
      <>
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th className="text-left">Artist</th>
            <th className="text-right">Plays</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((val) => {
            const { rank } = val['@attr'];

            return (
              <tr className="hover:bg-gray-400" key={val.name}>
                <td className="font-semibold text-right pr-4">
                  <span>
                    {rank}
                  </span>
                </td>
                <td className="p-2">
                  <a target="_blank" href={val.url} rel="noreferrer">
                    <ArtistImage mbid={val.mbid} artistName={val.name} />
                  </a>
                </td>
                <td className="font-semibold">
                  <a target="_blank" href={val.url} rel="noreferrer">{trimString(val.name, 45)}</a>
                </td>
                <td className="text-right">
                  {val.playcount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </>
    );
  }

  return (
    <div>
      <Pagination page={topItemsPage} totalPages={artist['@attr'].totalPages} />
      <table className="table-auto">
        {renderTable()}
      </table>
      <Pagination page={topItemsPage} totalPages={artist['@attr'].totalPages} />
    </div>
  );
});
export default ArtistTable;
