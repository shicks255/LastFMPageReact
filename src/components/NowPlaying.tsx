import React from 'react';
import ErrorMessage from './ErrorMessage';
import useRecentTracks from '../hooks/api/lastFm/useRecentTracks';

const NowPlaying: React.FC<Record<string, void>> = (() => {
  const { error, data } = useRecentTracks(1);

  if (error) {
    const { technical } = JSON.parse(error.message);
    if (technical !== 'No connection') return <ErrorMessage error={error} />;
  }
  if (!data) return <div />;

  const isNowPlaying = data.track[0]?.['@attr']?.nowplaying;
  if (!isNowPlaying) { return <div />; }

  const nowPlaying = data.track[0];

  return (
    <div className="nowPlaying">
      <br />
      <div className="inline-flex">
        <div className="">
          <img alt="" className="image" src={nowPlaying.image[1]['#text']} />
        </div>
        <div>
          <span className="nowPlaying">
            <span>{nowPlaying.name}</span>
            <br />
            <span className="font-semibold">{nowPlaying.artist['#text']}</span>
          </span>
        </div>
      </div>
      <div className=" w-auto">
        <img alt="" className="h-10 w-screen" src={`${process.env.PUBLIC_URL}/YdBO.gif`} />
      </div>
    </div>
  );
});

export default NowPlaying;
