import React from 'react';
import Pagination from '../Pagination';
import Loader from '../Loader';
import HoverImage from '../HoverImage';
import useIsMobile from '../../hooks/useIsMobile';
import ErrorMessage from '../ErrorMessage';
import { useApiState } from '../../contexts/ApiContext';
import { useTopAlbums } from '../../hooks/useLasftFmApi';

const AlbumTable: React.FC<Record<string, void>> = (() => {
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const {
    isLoading, error, data,
  } = useTopAlbums(topItemsTimeFrame, topItemsPage);
  const isMobile = useIsMobile();

  if (isLoading) { return <Loader small={false} />; }
  if (error) { return <ErrorMessage error={error} />; }
  if (!data) return <ErrorMessage error={new Error('')} />;

  const topAlbums = data;

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
      <Pagination page={topItemsPage} totalPages={topAlbums['@attr'].totalPages} />
      <table className="table is-striped is-hoverable is-fullwidth mainContent">
        {renderTable()}
      </table>
      <Pagination page={topItemsPage} totalPages={topAlbums['@attr'].totalPages} />
    </div>
  );
});

export default AlbumTable;
