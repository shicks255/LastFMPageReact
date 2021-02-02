import React, { useContext } from 'react';
import { LocalStateContext } from '../LocalStateContext';

const NowPlaying: React.FC<Record<string, void>> = (() => {
  const { state } = useContext(LocalStateContext);
  const { nowPlaying } = state;
  if (!nowPlaying) { return <div />; }

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
