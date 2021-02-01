import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';

const NowPlaying: React.FC<Record<string, void>> = (() => {
  const { state } = useContext(LocalStateContext);
  const { artist } = state.nowPlaying;
  if (!artist) { return <div />; }

  return (
    <div className="nowPlaying">
      <br />
      <div className="level">
        <div className="level-item">
          <table>
            <tbody>
              <tr>
                <td rowSpan={2}>
                  <img alt="" className="image" src={artist.image[1]['#text']} />
                </td>
                <td>&nbsp;</td>
                <td style={{ textAlign: 'center' }}>
                  <span className="nowPlaying">
                    {artist['#text']}
                    {' '}
                    -
                    {artist.name}
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
