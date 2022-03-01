import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import { ApiContextProvider } from './contexts/ApiContext';
import { LocalStateProvider } from './contexts/LocalStateContext';
import { ModalContextProvider } from './contexts/ModalContext';

const queryClient = new QueryClient();

const App: React.FC<null> = () => {
  return (
    <BrowserRouter>
      <LocalStateProvider>
        <QueryClientProvider client={queryClient}>
          <ApiContextProvider>
            <ModalContextProvider>
              <Header />
              <Body />
              <Footer />
              <ReactQueryDevtools initialIsOpen={false} />
            </ModalContextProvider>
          </ApiContextProvider>
        </QueryClientProvider>
      </LocalStateProvider>
    </BrowserRouter>
  );
};

export default App;
