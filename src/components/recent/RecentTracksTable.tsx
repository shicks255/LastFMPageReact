import React from 'react';

import { trimString } from '../../utils';
import ErrorMessage from '../ErrorMessage';
import HoverImage from '../HoverImage';
import Loader from '../Loader';
import Pagination from '../Pagination';
import { useApiState } from '@/contexts/ApiContext';
import useRecentTracks from '@/hooks/api/lastFm/useRecentTracks';
import useRecentTracksNavPageSync from '@/hooks/useRecentTracksNavPageSync';

const RecentTracksTable: React.FC<Record<string, void>> = () => {
  useRecentTracksNavPageSync();
  const { recentTracksPage } = useApiState();
  const { isLoading, error, data } = useRecentTracks(recentTracksPage);

  if (isLoading) return <Loader small={false} />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <ErrorMessage error={new Error('')} />;

  const recentTracks = data.recenttracks;

  function doDateThing(date: Date): JSX.Element {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.toLocaleString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

    return (
      <span>
        <span className="font-semibold">
          {month}/{day}/{year}
        </span>
        <br />
        {hour}
      </span>
    );
  }

  return (
    <div className="mainContent">
      <Pagination page={recentTracksPage} totalPages={recentTracks['@attr'].totalPages} />
      <div>
        {recentTracks.track
          .filter((x) => x.date)
          .map((track) => {
            const smallImgSrc =
              track?.image?.[1]?.['#text'] ??
              'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            const bigImgSrc =
              track?.image?.[3]?.['#text'] ??
              'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            const date = track.date.uts;
            const unixDate = new Date(date * 1000);
            return (
              <div className="flex hover:bg-gray-400" key={track.date.uts}>
                <div className="p-2">
                  <a href={track.url} target="_blank" rel="noreferrer">
                    <HoverImage
                      src={smallImgSrc}
                      popupSrc={bigImgSrc}
                      caption={track.album['#text']}
                    />
                  </a>
                </div>
                <div className="p-2 w-8 flex-1 m-auto">
                  <i>{trimString(track.name, 35)}</i>
                </div>
                <div className="p-2 w-8 flex-1 m-auto">
                  <span className="font-semibold">{trimString(track.artist['#text'], 35)}</span>
                </div>
                <div className="p-2 w-8 flex-1 m-auto text-right">{doDateThing(unixDate)}</div>
              </div>
            );
          })}
      </div>
      <Pagination page={recentTracksPage} totalPages={recentTracks['@attr'].totalPages} />
    </div>
  );
};

export default RecentTracksTable;
