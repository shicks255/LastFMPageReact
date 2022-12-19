import React, { useEffect, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { formatDateToTime, trimString } from '../../utils';
import HoverImage from '../common/HoverImage';
import Loader from '../common/Loader';
import Pagination from '../common/Pagination';
import ErrorMessage from '../ErrorMessage';
import { useApiState } from '@/contexts/ApiContext';
import useRecentTracks from '@/hooks/api/lastFm/useRecentTracks';
import { sendChangeView } from '@/hooks/useAnalytics';
import useRecentTracksNavPageSync from '@/hooks/useRecentTracksNavPageSync';

const RecentTracksTable: React.FC<Record<string, void>> = () => {
  useEffect(() => {
    sendChangeView('recent');
  }, []);
  useRecentTracksNavPageSync();
  const { recentTracksPage } = useApiState();
  const { isLoading, error, data } = useRecentTracks(recentTracksPage);

  const trackNameRef = useRef<HTMLDivElement | null>(null);
  const artistNameRef = useRef<HTMLDivElement | null>(null);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <ErrorMessage error={new Error('o no')} />;

  const recentTracks = data.recenttracks;

  function doDateThing(date: Date): JSX.Element {
    const x = formatDateToTime(date);

    return (
      <span>
        <span className="font-semibold">{x[0]}</span>
        <br />
        {x[1]}
      </span>
    );
  }

  return (
    <div>
      <div className="text-left rounded-lg text-2xl font-semibold p-4">Recent Scrobbles</div>
      <div className="py-1">
        <div className="w-full border-t border-gray-700"></div>
      </div>
      <Pagination page={recentTracksPage} totalPages={recentTracks['@attr'].totalPages} />
      <div>
        {recentTracks.track
          .filter((x) => x.date)
          .map((track) => {
            let smallImgSrc = track?.image?.[1]?.['#text'] ?? `${process.env.PUBLIC_URL}/music.svg`;
            let bigImgSrc = track?.image?.[3]?.['#text'] ?? `${process.env.PUBLIC_URL}/music.svg`;

            if (smallImgSrc.includes('/2a96cbd8b46e442fc41c2b86b821562f.png')) {
              smallImgSrc = `${process.env.PUBLIC_URL}/music.svg`;
            }
            if (bigImgSrc.includes('/2a96cbd8b46e442fc41c2b86b821562f.png')) {
              bigImgSrc = `${process.env.PUBLIC_URL}/music.svg`;
            }
            const date = track.date.uts;
            const unixDate = new Date(date * 1000);
            return (
              <div className="flex even:bg-slate-300 odd:bg-gray-200" key={uuidv4()}>
                <div className="p-2 pl-4 m-auto">
                  <a
                    aria-label={track.album['#text']}
                    href={track.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <HoverImage
                      src={smallImgSrc}
                      popupSrc={bigImgSrc}
                      caption={track.album['#text']}
                    />
                  </a>
                </div>
                <div className="p-2 w-8 flex-1 m-auto" ref={trackNameRef}>
                  <i>{trimString(track.name, 35)}</i>
                  {/* <StringRevealer ref={trackNameRef}>{track.name}</StringRevealer> */}
                </div>
                <div className="p-2 w-8 flex-1 m-auto" ref={artistNameRef}>
                  <span className="font-semibold">{trimString(track.artist['#text'], 35)}</span>
                </div>
                <div className="p-2 pr-4 w-8 flex-1 m-auto text-right">{doDateThing(unixDate)}</div>
              </div>
            );
          })}
      </div>
      <Pagination page={recentTracksPage} totalPages={recentTracks['@attr'].totalPages} />
    </div>
  );
};

export default RecentTracksTable;
