import React, { useEffect } from 'react';

import useTopAlbums from '../../hooks/api/lastFm/useTopAlbums';
import { trimString } from '../../utils';
import HoverImage from '../common/HoverImage';
import Loader from '../common/Loader';
import NoData from '../common/NoData';
import Pagination from '../common/Pagination';
import ErrorMessage from '../ErrorMessage';
import { useApiState } from '@/contexts/ApiContext';
import { sendChangeRankStrategy } from '@/hooks/useAnalytics';

const AlbumTable: React.FC<Record<string, void>> = () => {
  useEffect(() => {
    sendChangeRankStrategy('album');
  }, []);
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const { isLoading, error, data } = useTopAlbums(topItemsTimeFrame, topItemsPage);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return <ErrorMessage error={new Error('')} />;

  const topAlbums = data.topalbums;

  return (
    <div>
      <div className="text-left text-2xl font-semibold p-4">Top Albums</div>
      <div className="py-1">
        <div className="w-full border-t border-gray-700"></div>
      </div>
      <Pagination page={topItemsPage} totalPages={topAlbums['@attr'].totalPages} />
      <div>
        {topAlbums.album.length === 0 && <NoData />}
        {topAlbums.album.map((val) => {
          const smallImgSrc =
            val?.image?.[1]?.['#text'] ??
            'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
          const bigImgSrc =
            val?.image?.[3]?.['#text'] ??
            'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
          const { rank } = val['@attr'];

          return (
            <div className="flex even:bg-slate-300 odd:bg-gray-200" key={val.url}>
              <div className="font-semibold flex-none w-2 mx-4 my-auto">
                <span>{rank}</span>
              </div>
              <div className="p-2 m-auto">
                <a aria-label={val.name} target="_blank" href={val.url} rel="noreferrer">
                  <HoverImage src={smallImgSrc} popupSrc={bigImgSrc} caption={val.name} />
                </a>
              </div>
              <div className="p-2 w-8 flex-1 m-auto">
                <i>{trimString(val.name, 35)}</i>
              </div>
              <div className="p-2 w-8 flex-1 font-semibold m-auto">
                <a aria-label={val.artist.name} href={val.url} target="_blank" rel="noreferrer">
                  {trimString(val.artist.name, 35)}
                </a>
              </div>
              <div className="p-2 pr-4 w-8 flex-1 text-right m-auto">{val.playcount}</div>
            </div>
          );
        })}
      </div>

      <Pagination page={topItemsPage} totalPages={topAlbums['@attr'].totalPages} />
    </div>
  );
};

export default AlbumTable;
