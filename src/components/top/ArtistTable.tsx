import React from 'react';

import { trimString } from '../../utils';
import ArtistImage from '../common/ArtistImage';
import Loader from '../common/Loader';
import Pagination from '../common/Pagination';
import ErrorMessage from '../ErrorMessage';
import { useApiState } from '@/contexts/ApiContext';
import useTopArtists from '@/hooks/api/lastFm/useTopArtists';

const ArtistTable: React.FC<Record<string, void>> = () => {
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const { isLoading, error, data } = useTopArtists(topItemsTimeFrame, topItemsPage);

  if (isLoading) {
    return <Loader small={false} />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return <div>ahh</div>;

  const artist = data.topartists;
  const artists = artist.artist;

  function renderTable() {
    return (
      <>
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th className="p-2 text-left">Artist</th>
            <th className="p-2 text-right pr-12">Plays</th>
          </tr>
        </thead>
        <tbody className="border-t border-gray-700">
          {artists.map((val) => {
            const rank = val['@attr']?.rank;

            return (
              <tr className="even:bg-slate-300 odd:bg-gray-200" key={val.name}>
                <td className="font-semibold text-center w-12">
                  <span>{rank}</span>
                </td>
                <td className="p-2">
                  <a target="_blank" href={val.url} rel="noreferrer">
                    <ArtistImage mbid={val.mbid} artistName={val.name} />
                  </a>
                </td>
                <td className="p-2 font-semibold">
                  <a target="_blank" href={val.url} rel="noreferrer">
                    {trimString(val.name, 45)}
                  </a>
                </td>
                <td className="pr-12 text-right">{val.playcount}</td>
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
      {/* <table className="min-w-full">{renderTable()}</table> */}
      <div className="py-1">
        <div className="w-full border-t border-gray-700"></div>
      </div>
      <div className="text-left text-2xl font-semibold p-4">Top Artists</div>
      <div>
        {artists.map((val) => {
          const rank = val['@attr']?.rank;

          return (
            <div className="flex even:bg-slate-300 odd:bg-gray-200" key={val.name}>
              <div className="font-semibold flex-none w-2 mx-4 my-auto">
                <span>{rank}</span>
              </div>
              <div className="p-2">
                <a target="_blank" href={val.url} rel="noreferrer">
                  <ArtistImage mbid={val.mbid} artistName={val.name} />
                </a>
              </div>
              <div className="p-2 w-8 flex-1 m-auto font-semibold">
                <a target="_blank" href={val.url} rel="noreferrer">
                  {trimString(val.name, 45)}
                </a>
              </div>
              <div className="p-2 pr-4 flex-1 m-auto text-right">{val.playcount}</div>
            </div>
          );
        })}
      </div>

      <Pagination page={topItemsPage} totalPages={artist['@attr'].totalPages} />
    </div>
  );
};
export default ArtistTable;
