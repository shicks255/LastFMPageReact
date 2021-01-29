import React from 'react';
import { Artist } from '../types/Artist';
import { Image } from '../types/Image';

type Props = {
  nowPlaying: {
    image: Image[],
    artist: Artist,
    name: string,
  }
}

export default function NowPlaying(props: Props) {
  const { nowPlaying } = props;
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
}
