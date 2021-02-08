import React, { useState } from 'react';
import { NowPlaying } from './types/NowPlaying';

type State = {
  page: number,
  strategy: string,
  timeFrame: string,
  selected: string,
}
type Actions = {
  setPage: (x: number) => void,
  setStrategy: (x: string) => void,
  setTimeFrame: (x: string) => void,
  setSelected: (x: string) => void,
}

const ApiContextState = React.createContext<State | undefined>(undefined);
const ApiContextDispatch = React.createContext<Actions | undefined>(undefined);

type Props = {
  children: JSX.Element
}
function ApiContextProvider(props: Props) {
  const { children } = props;
  const [page, setPage] = useState<number>(1);
  const [strategy, setStrategy] = useState<string>('getTopArtists');
  const [timeFrame, setTimeFrame] = useState<string>('7day');
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>();
  const [selected, setSelected] = useState<string>('recent');

  const state = {
    page, strategy, timeFrame, selected,
  };

  const actions = {
    setPage, setStrategy, setTimeFrame, setSelected,
  };

  return (
    <ApiContextState.Provider value={state}>
      <ApiContextDispatch.Provider value={actions}>
        {children}
      </ApiContextDispatch.Provider>
    </ApiContextState.Provider>
  );
}

function useApiState() {
  const context = React.useContext(ApiContextState);
  if (context === undefined) {
    throw Error('');
  }
  return context;
}

function useApiDispatch() {
  const context = React.useContext(ApiContextDispatch);
  if (context === undefined) {
    throw Error('');
  }
  return context;
}

export {
  ApiContextDispatch, ApiContextState, ApiContextProvider, useApiState, useApiDispatch,
};
