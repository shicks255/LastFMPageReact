import { IAlbum } from '@/types/Album';
import { IArtist } from '@/types/Artist';
import { ITrack } from '@/types/Track';

const PINK_FLOYD: IArtist = {
  image: [{ '#text': 'image' }],
  name: 'Pink Floyd',
  playcount: 100,
  mbid: '',
  url: '',
  '#text': ''
};

const BOB_DYLAN: IArtist = {
  image: [{ '#text': 'image' }],
  name: 'Bob Dylan',
  playcount: 75,
  mbid: '',
  url: '',
  '#text': ''
};

const SLAYER: IArtist = {
  image: [{ '#text': 'image' }],
  name: 'Slayer',
  playcount: 55,
  mbid: '',
  url: '',
  '#text': ''
};

const DARK_SIDE_MOON: IAlbum = {
  image: [{ '#text': 'test' }],
  url: '',
  artist: PINK_FLOYD,
  playcount: 100,
  name: 'Dark Side of the Moon',
  '@attr': {
    rank: 1
  }
};

const MONEY: ITrack = {
  url: 'test',
  image: [{ '#text': 'image' }, { '#text': 'two' }],
  name: 'Money',
  playcount: 100,
  duration: 300,
  date: {
    uts: 123
  },
  artist: PINK_FLOYD,
  album: DARK_SIDE_MOON,
  '@attr': { rank: 1, nowplaying: true }
};

export { PINK_FLOYD, BOB_DYLAN, SLAYER, DARK_SIDE_MOON, MONEY };
