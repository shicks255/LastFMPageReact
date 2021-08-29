/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { useTopArtists } from '../../hooks/useLasftFmApi';
import Pagination from '../Pagination';
import Loader from '../Loader';
import ArtistImage from '../ArtistImage';
import ErrorMessage from '../ErrorMessage';
import { useApiState } from '../../contexts/ApiContext';

const ArtistTable: React.FC<Record<string, void>> = (() => {
  const { topItemsTimeFrame, topItemsPage } = useApiState();
  const {
    isLoading, error, data,
  } = useTopArtists(topItemsTimeFrame, topItemsPage);

  if (isLoading) { return <Loader small={false} />; }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) return <div>ahh</div>;

  const artist = data;
  const artists = artist.artist;

  const content = artists.map((val) => {
    const artistName = val.name;
    const { rank } = val['@attr'];
    return (
      <tr key={artistName}>
        <td className="alignRight">{rank}</td>
        <td>
          <div className="imageCell">
            <a target="_blank" href={val.url} rel="noreferrer">
              <ArtistImage mbid={val.mbid} artistName={val.name} />
            </a>
          </div>
        </td>
        <td><a target="_blank" href={val.url} rel="noreferrer"><b>{val.name}</b></a></td>
        <td>{val.playcount}</td>
      </tr>
    );
  });

  return (
    <div>
      <Pagination page={topItemsPage} totalPages={artist['@attr'].totalPages} />
      <table className="table is-fullwidth mainContent">
        <thead>
          <tr>
            <th aria-label="Rank Header" />
            <th aria-label="Image Header" />
            <th>Name</th>
            <th>Plays</th>
          </tr>
        </thead>

        <tbody>
          {content}
        </tbody>
      </table>
      <Pagination page={topItemsPage} totalPages={artist['@attr'].totalPages} />
    </div>
  );
});

export default ArtistTable;
