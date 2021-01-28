import * as React from 'react';
import { useState } from 'react';

const LocalStateContext = React.createContext();

function Providerr(props) {
  const { children } = props;

  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'shicks255');
  const [showModal, setShowModal] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalImageCaption, setModalImageCaption] = useState('');
  const [modalTimeout, setModalTimeout] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [strategy, setStrategy] = useState('getTopArtists');
  const [timeFrame, setTimeFrame] = useState('7day');
  const [nowPlaying, setNowPlaying] = useState('');
  const [selected, setSelected] = useState('recent');

  const state = {
    userName,
    showModal,
    modalErrorMessage,
    modalImageSrc,
    modalImageCaption,
    modalTimeout,
    loading,
    page,
    strategy,
    timeFrame,
    nowPlaying,
    selected,
  };

  const actions = {
    setUserName,
    setShowModal,
    setModalErrorMessage,
    setModalImageSrc,
    setModalImageCaption,
    setModalTimeout,
    setLoading,
    setPage,
    setStrategy,
    setTimeFrame,
    setNowPlaying,
    setSelected,
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

export { LocalStateContext, Providerr };

Providerr.propTypes = {
  children: Array,
};

Providerr.defaultProps = {
  children: [],
};
