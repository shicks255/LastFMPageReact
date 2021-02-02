import * as React from 'react';
import { useState } from 'react';
import { NowPlaying } from './types/NowPlaying';
import { FetchError } from './types/FetchError';

type State = {
  userName: string,
  showModal: boolean,
  modalErrorMessage: string,
  modalImageSrc: string,
  modalImageCaption: string,
  page: number,
  strategy: string,
  timeFrame: string,
  nowPlaying: NowPlaying | undefined,
  selected: string,
  recentTracksError: FetchError | undefined,
  recentTracksBigError: FetchError | undefined,
  topArtistsError: FetchError | undefined,
  topAlbumsError: FetchError | undefined,
  topTracksError: FetchError | undefined,
}

type Actions = {
  setUserName: (string) => void,
  setShowModal: (boolean) => void,
  setModalErrorMessage: (string) => void,
  setModalImageSrc: (string) => void,
  setModalImageCaption: (string) => void,
  setPage: (number) => void,
  setStrategy: (string) => void,
  setTimeFrame: (string) => void,
  setNowPlaying: (x: NowPlaying | undefined) => void,
  setSelected: (string) => void,
  setRecentTracksError: (x: FetchError | undefined) => void,
  setRecentTracksBigError: (x: FetchError | undefined) => void,
  setTopArtistsError: (x: FetchError | undefined) => void,
  setTopAlbumsError: (x: FetchError | undefined) => void,
  setTopTracksError: (x: FetchError | undefined) => void,
}

type ContextProps = {
  state: State,
  actions: Actions,
}

const LocalStateContext: React.Context<ContextProps> = React.createContext<ContextProps>({
  state: {
    userName: 'shicks255',
    showModal: false,
    modalErrorMessage: '',
    modalImageSrc: '',
    modalImageCaption: '',
    page: 1,
    strategy: 'getTopArtists',
    timeFrame: '7day',
    nowPlaying: undefined,
    selected: 'recent',
    recentTracksError: undefined,
    recentTracksBigError: undefined,
    topArtistsError: undefined,
    topAlbumsError: undefined,
    topTracksError: undefined,
  },
  actions: {
    setUserName: (x: string) => x,
    setShowModal: (x) => x,
    setModalErrorMessage: (x) => x,
    setModalImageSrc: (x) => x,
    setModalImageCaption: (x) => x,
    setPage: (x) => x,
    setStrategy: (x) => x,
    setTimeFrame: (x) => x,
    setNowPlaying: (x) => x,
    setSelected: (x) => x,
    setRecentTracksError: (x) => x,
    setRecentTracksBigError: (x) => x,
    setTopArtistsError: (x) => x,
    setTopAlbumsError: (x) => x,
    setTopTracksError: (x) => x,
  },
});

type Props = {
  children: React.FC[]
}

function Provider(props: Props): JSX.Element {
  const { children } = props;

  const [userName, setUserName] = useState<string>(localStorage.getItem('userName') || 'shicks255');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalErrorMessage, setModalErrorMessage] = useState<string>('');
  const [modalImageSrc, setModalImageSrc] = useState<string>('');
  const [modalImageCaption, setModalImageCaption] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [strategy, setStrategy] = useState<string>('getTopArtists');
  const [timeFrame, setTimeFrame] = useState<string>('7day');
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>();
  const [selected, setSelected] = useState<string>('recent');

  const [recentTracksError, setRecentTracksError] = useState<FetchError>();
  const [recentTracksBigError, setRecentTracksBigError] = useState<FetchError>();
  const [topArtistsError, setTopArtistsError] = useState<FetchError>();
  const [topAlbumsError, setTopAlbumsError] = useState<FetchError>();
  const [topTracksError, setTopTracksError] = useState<FetchError>();

  const state = {
    userName,
    showModal,
    modalErrorMessage,
    modalImageSrc,
    modalImageCaption,
    page,
    strategy,
    timeFrame,
    nowPlaying,
    selected,
    recentTracksError,
    recentTracksBigError,
    topArtistsError,
    topAlbumsError,
    topTracksError,
  };

  const actions = {
    setUserName,
    setShowModal,
    setModalErrorMessage,
    setModalImageSrc,
    setModalImageCaption,
    setPage,
    setStrategy,
    setTimeFrame,
    setNowPlaying,
    setSelected,
    setRecentTracksError,
    setRecentTracksBigError,
    setTopArtistsError,
    setTopAlbumsError,
    setTopTracksError,
  };

  const context = {
    state,
    actions,
  };

  return (
    <LocalStateContext.Provider value={context}>
      {children}
    </LocalStateContext.Provider>
  );
}

export { LocalStateContext, Provider };
