import React from 'react';
import ErrorMessage from './ErrorMessage';
import { useRecentTracks } from '../hooks/useLasftFmApi';

const NowPlaying: React.FC<Record<string, void>> = (() => {
  const { error, data } = useRecentTracks(1);

  if (error) return <ErrorMessage error={error} />;
  if (!data) return <div />;

  const isNowPlaying = data.track[0]?.['@attr']?.nowplaying;
  if (!isNowPlaying) { return <div />; }

  const nowPlaying = data.track[0];

  return (
    <div className="nowPlaying">
      <br />
      <div className="level">
        <div className="level-item">
          <table>
            <tbody>
              <tr>
                <td rowSpan={2}>
                  <img alt="" className="image" src={nowPlaying.image[1]['#text']} />
                </td>
                <td>&nbsp;</td>
                <td style={{ textAlign: 'center' }}>
                  <span className="nowPlaying">
                    {nowPlaying.artist['#text']}
                    {' '}
                    -
                    {nowPlaying.name}
                  </span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>
                  <img alt="" className="gif" src={`${process.env.PUBLIC_URL}/YdBO.gif`} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default NowPlaying;
