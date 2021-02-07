import React from 'react';
import Pagination from '../Pagination';
import useLastFmApi from '../../hooks/useLasftFmApi';
import Loader from '../Loader';
import HoverImage from '../HoverImage';
import useIsMobile from '../../hooks/useIsMobile';

export default function AlbumTable() {
  const { topAlbumsQuery } = useLastFmApi();
  const isMobile = useIsMobile();

  if (topAlbumsQuery.isLoading) { return <Loader small={false} />; }
  const topAlbums = topAlbumsQuery.data;

  function renderTable() {
    if (isMobile) {
      return (
        topAlbums.album.map((val) => {
          const url = val.image[1]['#text'].length > 0 ? val.image[1]['#text'] : 'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png';
          const { rank } = val['@attr'];
          return (
            <tr key={val.name}>
              <td className="alignRight">
                {rank}
                .
              </td>
              <td>
                <div className="imageCell">
                  <a href={val.url} target="_blank" rel="noreferrer">
                    <img alt="" height={64} width={64} src={url} />
                  </a>
                </div>
              </td>
              <td>
                <a href={val.url} target="_blank" rel="noreferrer"><b>{val.artist.name}</b></a>
                <br />
                <i>{val.name}</i>
              </td>
              <td className="alignRight">{val.playcount}</td>
            </tr>
          );
        })
      );
    }
    return (
      <>
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th aria-label="Info Header" />
            <th>Album</th>
            <th>Plays</th>
          </tr>
        </thead>

        <tbody>
          {topAlbums.album.map((val) => {
            const smallImgSrc = val?.image?.[1]?.['#text'] ?? 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            const bigImgSrc = val?.image?.[3]?.['#text'] ?? 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            const { rank } = val['@attr'];
            return (
              <tr key={val.name}>
                <td className="alignRight">
                  {rank}
                </td>
                <td>
                  <div className="imageCell">
                    <a href={val.url} target="_blank" rel="noreferrer">
                      <HoverImage src={smallImgSrc} popupSrc={bigImgSrc} caption={val.name} />
                    </a>
                  </div>
                </td>
                <td><a href={val.url} target="_blank" rel="noreferrer"><b>{val.artist.name}</b></a></td>
                <td><i>{val.name}</i></td>
                <td className="alignRight">{val.playcount}</td>
              </tr>
            );
          })}
        </tbody>
      </ >
    );
  }

  return (
    <div>
      <Pagination totalPages={topAlbums['@attr'].totalPages} />
      <table className="table is-striped is-hoverable is-fullwidth mainContent">
        {renderTable()}
      </table>
      <Pagination totalPages={topAlbums['@attr'].totalPages} />
    </div>
  );
}
