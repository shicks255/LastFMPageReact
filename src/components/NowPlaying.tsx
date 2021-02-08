import React from 'react';
import useLastFmApi from '../hooks/useLasftFmApi';
import ErrorMessage from './ErrorMessage';

const NowPlaying: React.FC<Record<string, void>> = (() => {
  const { recentTracksQuery } = useLastFmApi();

  const recentTracks = recentTracksQuery(1);
  if (recentTracks.error) return <ErrorMessage error={recentTracks.error} />;
  if (!recentTracks.data) return <div />;

  const isNowPlaying = recentTracks.data.track[0]?.['@attr']?.nowplaying;
  if (!isNowPlaying) { return <div />; }

  const nowPlaying = recentTracks.data.track[0];

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
