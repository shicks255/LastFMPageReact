import React from 'react';
import useLastFmApi from '../../useLasftFmApi';
import Pagination from '../Pagination';
import Loader from '../Loader';
import ArtistImage from '../ArtistImage';

export default function ArtistTable() {
  const { topArtistsQuery } = useLastFmApi();
  // const [artists, setArtists] = useState(undefined);

  if (topArtistsQuery.isLoading) { return <Loader />; }
  const artist = topArtistsQuery.data;
  const artists = artist.artist;
  // console.log(topArtists);

  // useEffect(() => {
  //   async function mapStuff() {
  //     const artistss =
  //     await topArtists.artist.map((value) => getActualArtistUrl(value, 'artistTable'));
  //     Promise.all(artistss).then((res) => setArtists(res));
  //   }
  //   mapStuff();
  // }, [topArtists]);

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
      <Pagination totalPages={artist['@attr'].totalPages} />
      <table className="table is-fullwidth">
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
      <Pagination totalPages={artist['@attr'].totalPages} />
    </div>
  );
}
