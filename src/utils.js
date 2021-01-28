/* eslint-disable no-use-before-define */
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

const fanartKey = process.env.REACT_APP_FANART_KEY;

function getMusicBrainzId(artistName) {
  console.log(artistName);
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
        console.log(res);
        const mbid = res.artists[0].id;
        return getFanArtImage(mbid, artistName, true);
      }
      return 'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png';
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
        imageUrl = 'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png';
      }

      console.log(imageUrl);
      return imageUrl;
    });
}

export function getActualArtistUrl(mbid, artistName) {
  console.log(artistName);
  return (mbid && mbid.length > 0)
    ? getFanArtImage(mbid, artistName, false)
    : getMusicBrainzId(artistName);
}

export function convertDurationToTimestamp(duration) {
  const min = Math.floor(duration / 60);
  const sec = duration - (min * 60);
  const secString = sec < 10 ? `0${sec.toString()}` : sec.toString();
  return `${min}:${secString.substr(0, 2)}`;
}
