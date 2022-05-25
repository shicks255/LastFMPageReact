import React, { useRef } from 'react';

import { convertDurationToTimestamp, trimString } from '../../utils';
import ArtistImage from '../common/ArtistImage';
import Loader from '../common/Loader';
import Pagination from '../common/Pagination';
import StringRevealer from '../common/StringRevealer';
import ErrorMessage from '../ErrorMessage';
import { useApiState } from '@/contexts/ApiContext';
import useTopTracks from '@/hooks/api/lastFm/useTopTracks';
import useIsMobile from '@/hooks/useIsMobile';

const TracksTable: React.FC<Record<string, void>> = (): JSX.Element => {
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const { isLoading, error, data } = useTopTracks(topItemsTimeFrame, topItemsPage);
  const isMobile = useIsMobile();

  const artistNameRef = useRef<HTMLDivElement | null>(null);
  const trackNameRef = useRef<HTMLDivElement | null>(null);

  console.log(isMobile);

  if (isLoading) {
    return <Loader small={false} />;
  }
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <ErrorMessage error={new Error('')} />;

  const topTracks = data.toptracks;
  const tracks = topTracks.track;

  if (!tracks) return <Loader small={false} />;

  return (
    <div>
      <Pagination page={topItemsPage} totalPages={topTracks['@attr'].totalPages} />
      <div className="py-1">
        <div className="w-full border-t border-gray-700"></div>
      </div>
      <div className="text-left text-2xl font-semibold p-4">Top Songs</div>
      <div>
        {tracks.map((val) => {
          const time = convertDurationToTimestamp(val.duration);

          const title = val.name;
          const rank = val['@attr']?.rank;
          return (
            <div key={title} className="flex even:bg-slate-300 odd:bg-gray-200">
              <div className="font-semibold flex-none w-2 mx-4 my-auto">{rank}</div>
              <div className="p-2 m-auto">
                <div className="imageCell pr-2">
                  <a aria-label={val.artist.name} href={val.url} target="_blank" rel="noreferrer">
                    <ArtistImage mbid={val.artist.mbid} artistName={val.artist.name} />
                  </a>
                </div>
              </div>
              {!isMobile && (
                <>
                  <div className="p-2 w-8 flex-1 m-auto" ref={trackNameRef}>
                    <i>{trimString(val.name)}</i>
                    {/* <i> */}
                    {/* <StringRevealer ref={trackNameRef}>{val.name}</StringRevealer> */}
                    {/* </i> */}
                  </div>
                  <div className="p-2 w-8 flex-1 m-auto font-semibold" ref={artistNameRef}>
                    {/* <StringRevealer ref={artistNameRef}>{val.artist.name}</StringRevealer> */}
                    {trimString(val.artist.name, 45)}
                  </div>
                </>
              )}
              {isMobile && (
                <>
                  <div className="p-2 w-64 flex-1 m-auto">
                    <i>{trimString(val.name)}</i>
                    <br />
                    <span className="font-semibold">{trimString(val.artist.name, 45)}</span>
                  </div>
                </>
              )}
              <div className="p-2 w-8 flex-1 m-auto text-right">{time}</div>
              <div className="p-2 pr-4 flex-1 m-auto text-right">{val.playcount}</div>
            </div>
          );
        })}
      </div>
      <Pagination page={topItemsPage} totalPages={topTracks['@attr'].totalPages} />
    </div>
  );
};

export default TracksTable;
