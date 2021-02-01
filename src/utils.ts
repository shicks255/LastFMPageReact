export const timeFrames = {
  '7day': '7 Days',
  '1month': '1 Month',
  '3month': '3 Months',
  '6month': '6 Months',
  '12month': '1 Year',
  overall: 'All Time',
};

export const strategies = {
  getTopArtists: 'Top Artists',
  getTopAlbums: 'Top Albums',
  getTopTracks: 'Top Songs',
};

export const chartColors = [
  'rgb(190, 174, 212)',
  'rgb(127, 201, 127)',
  'rgb(191, 91, 23)',
  'rgb(240, 2, 127)',
  'rgb(91,132,186)',
  'rgb(255, 255, 153)',
  'rgb(253, 192, 134)',
  'rgb(202,57,57)',
  'rgb(84,162,108)',
  'rgb(156, 121, 201)',
  'rgb(147,195,9)',
  'rgb(221,124,60)',
];

const fanartKey = process.env.REACT_APP_FANART_KEY;
const noImageUrl = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

function getMusicBrainzId(artistName) {
  const fullName = encodeURI(artistName);
  return fetch(`https://musicbrainz.org/ws/2/artist/?query=${fullName}&fmt=json`,
    {
      headers: {
        'User-Agent': 'SteveFM/1.0 https:\\/\\/music.stevenmhicks.com shicks255@yahoo.com',
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.artists) {
        const mbid = res.artists[0].id;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return getFanArtImage(mbid, artistName, true);
      }
      return noImageUrl;
    });
}

function getFanArtImage(mbid, artistName, secondTry) {
  let imageUrl = '';
  const url = `https://webservice.fanart.tv/v3/music/${mbid}?api_key=${fanartKey}&format=json`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.artistthumb) {
        imageUrl = res.artistthumb[0].url;
      } else if (res.artistbackground) {
        imageUrl = res.artistbackground[0].url;
      } else if (res.hdmusiclogo) {
        imageUrl = res.hdmusiclogo[0].url;
      } else if (res.musiclogo) {
        imageUrl = res.musiclogo[0].url;
      } else if (res.albums && res.albums[0]) {
        imageUrl = res.albums[0].albumcover[0].url;
      } else if (!secondTry) {
        return getMusicBrainzId(artistName);
      } else {
        imageUrl = noImageUrl;
      }

      return imageUrl;
    });
}

export function getActualArtistUrl(mbid: string, artistName: string): string {
  return (mbid && mbid.length > 0)
    ? getFanArtImage(mbid, artistName, false)
    : getMusicBrainzId(artistName);
}

export function convertDurationToTimestamp(duration: number): string {
  const min = Math.floor(duration / 60);
  const sec = duration - (min * 60);
  const secString = sec < 10 ? `0${sec.toString()}` : sec.toString();
  return `${min}:${secString.substr(0, 2)}`;
}
