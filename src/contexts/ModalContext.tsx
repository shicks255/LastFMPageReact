import React, { useState } from 'react';

interface IType {
  state: {
    modalImageSrc: string;
    modalImageCaption: string;
  };
  actions: {
    setModalImageSrc: (x: string) => void;
    setModalImageCaption: (x: string) => void;
  };
}

const ModalContext = React.createContext<IType | undefined>(undefined);

interface IProps {
  children: React.ReactNode;
}
function ModalContextProvider(props: IProps) {
  const [modalImageSrc, setModalImageSrc] = useState<string>('');
  const [modalImageCaption, setModalImageCaption] = useState<string>('');

  const { children } = props;

  const state = {
    modalImageSrc,
    modalImageCaption
  };
  const actions = {
    setModalImageSrc,
    setModalImageCaption
  };

  return <ModalContext.Provider value={{ state, actions }}>{children}</ModalContext.Provider>;
}

function useModalState(): IType {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw Error('');
  }

  return context;
}

export { ModalContextProvider, useModalState, ModalContext };
