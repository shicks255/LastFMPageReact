import React from 'react';

import useTopAlbums from '../../hooks/api/lastFm/useTopAlbums';
import { trimString } from '../../utils';
import HoverImage from '../common/HoverImage';
import Loader from '../common/Loader';
import Pagination from '../common/Pagination';
import ErrorMessage from '../ErrorMessage';
import { useApiState } from '@/contexts/ApiContext';

const AlbumTable: React.FC<Record<string, void>> = () => {
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const { isLoading, error, data } = useTopAlbums(topItemsTimeFrame, topItemsPage);

  if (isLoading) {
    return <Loader small={false} />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return <ErrorMessage error={new Error('')} />;

  const topAlbums = data.topalbums;

  function renderTable() {
    return (
      <>
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th className="text-left">Album</th>
            <th className="text-left">Artist</th>
            <th className="text-right">Plays</th>
          </tr>
        </thead>
        <tbody>
          {topAlbums.album.map((val) => {
            const smallImgSrc =
              val?.image?.[1]?.['#text'] ??
              'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            const bigImgSrc =
              val?.image?.[3]?.['#text'] ??
              'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            const { rank } = val['@attr'];

            return (
              <tr className="hover:bg-gray-400" key={val.url}>
                <td className="font-semibold text-right pr-4">
                  <span>{rank}</span>
                </td>
                <td className="p-2">
                  <a target="_blank" href={val.url} rel="noreferrer">
                    <HoverImage src={smallImgSrc} popupSrc={bigImgSrc} caption={val.name} />
                  </a>
                </td>
                <td className="p-2">
                  <i>{trimString(val.name, 35)}</i>
                </td>
                <td className="font-semibold">
                  <a href={val.url} target="_blank" rel="noreferrer">
                    {trimString(val.artist.name, 35)}
                  </a>
                </td>
                <td className="text-right">{val.playcount}</td>
              </tr>
            );
          })}
        </tbody>
      </>
    );
  }

  return (
    <div>
      <Pagination page={topItemsPage} totalPages={topAlbums['@attr'].totalPages} />
      <table className="min-w-full">{renderTable()}</table>
      <Pagination page={topItemsPage} totalPages={topAlbums['@attr'].totalPages} />
    </div>
  );
};

export default AlbumTable;
