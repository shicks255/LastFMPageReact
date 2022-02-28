import React, { useState } from 'react';

interface IState {
  selected: string;
  recentTracksPage: number;
  topItemsPage: number;
  topItemsStrategy: string;
  topItemsTimeFrame: string;
  timeFrame: string;
  page: number;
}

interface IActions {
  setSelected: (x: string) => void;
  setRecentTracksPage: (x: number) => void;
  setTopItemsPage: (x: number) => void;
  setTopItemsStrategy: (x: string) => void;
  setTopItemsTimeFrame: (x: string) => void;
  setTimeFrame: (x: string) => void;
  setPage: (x: number) => void;
}

const ApiContextState = React.createContext<IState | undefined>(undefined);
const ApiContextDispatch = React.createContext<IActions | undefined>(undefined);

interface IProps {
  children: JSX.Element;
}

function ApiContextProvider(props: IProps): JSX.Element {
  const { children } = props;
  const [selected, setSelected] = useState<string>('recent');
  const [recentTracksPage, setRecentTracksPage] = useState<number>(1);
  const [topItemsPage, setTopItemsPage] = useState<number>(1);
  const [topItemsStrategy, setTopItemsStrategy] = useState<string>('getTopArtists');
  const [topItemsTimeFrame, setTopItemsTimeFrame] = useState<string>('7day');
  const [timeFrame, setTimeFrame] = useState<string>('7day');
  const [page, setPage] = useState<number>(1);

  const state = {
    recentTracksPage,
    topItemsPage,
    page,
    timeFrame,
    topItemsTimeFrame,
    selected,
    topItemsStrategy
  };

  const actions = {
    setRecentTracksPage,
    setTopItemsPage,
    setPage,
    setTimeFrame,
    setTopItemsTimeFrame,
    setSelected,
    setTopItemsStrategy
  };

  return (
    <ApiContextState.Provider value={state}>
      <ApiContextDispatch.Provider value={actions}>{children}</ApiContextDispatch.Provider>
    </ApiContextState.Provider>
  );
}

function useApiState(): IState {
  const context = React.useContext(ApiContextState);
  if (context === undefined) {
    throw Error('');
  }
  return context;
}

function useApiDispatch(): IActions {
  const context = React.useContext(ApiContextDispatch);
  if (context === undefined) {
    throw Error('');
  }
  return context;
}

export { ApiContextDispatch, ApiContextState, ApiContextProvider, useApiState, useApiDispatch };
