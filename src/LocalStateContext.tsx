import * as React from 'react';
import { useState } from 'react';
import { NowPlaying } from './types/NowPlaying';

type State = {
  userName: string,
  showModal: boolean,
  modalErrorMessage: string,
  nowPlaying: NowPlaying | undefined,
}

type Actions = {
  setUserName: (string) => void,
  setShowModal: (boolean) => void,
  setModalErrorMessage: (string) => void,
  setNowPlaying: (x: NowPlaying | undefined) => void,
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
    nowPlaying: undefined,
  },
  actions: {
    setUserName: (x: string) => x,
    setShowModal: (x) => x,
    setModalErrorMessage: (x) => x,
    setNowPlaying: (x) => x,
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
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>();

  const state = {
    userName,
    showModal,
    modalErrorMessage,
    nowPlaying,
  };

  const actions = {
    setUserName,
    setShowModal,
    setModalErrorMessage,
    setNowPlaying,
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
