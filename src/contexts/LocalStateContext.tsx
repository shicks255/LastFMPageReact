import * as React from 'react';
import { useState } from 'react';

import { INowPlaying } from '@/types/NowPlaying';

interface IState {
  userName: string;
  showModal: boolean;
  modalErrorMessage: string;
  nowPlaying: INowPlaying | undefined;
}

interface IActions {
  setUserName: (string) => void;
  setShowModal: (boolean) => void;
  setModalErrorMessage: (string) => void;
  setNowPlaying: (x: INowPlaying | undefined) => void;
}

interface IContextProps {
  state: IState;
  actions: IActions;
}

const LocalStateContext: React.Context<IContextProps> = React.createContext<IContextProps>({
  state: {
    userName: 'shicks255',
    showModal: false,
    modalErrorMessage: '',
    nowPlaying: undefined
  },
  actions: {
    setUserName: (x: string) => x,
    setShowModal: (x) => x,
    setModalErrorMessage: (x) => x,
    setNowPlaying: (x) => x
  }
});

interface IProps {
  children: React.ReactNode;
}

const Provider: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  const [userName, setUserName] = useState<string>(localStorage.getItem('userName') || 'shicks255');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalErrorMessage, setModalErrorMessage] = useState<string>('');
  const [nowPlaying, setNowPlaying] = useState<INowPlaying>();

  const state = {
    userName,
    showModal,
    modalErrorMessage,
    nowPlaying
  };

  const actions = {
    setUserName,
    setShowModal,
    setModalErrorMessage,
    setNowPlaying
  };

  const context = {
    state,
    actions
  };

  return <LocalStateContext.Provider value={context}>{children}</LocalStateContext.Provider>;
};

export { LocalStateContext, Provider };
