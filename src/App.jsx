import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { Provider } from './contexts/LocalStateContext';
import { ApiContextProvider } from './contexts/ApiContext';
import { ModalContextProvider } from './contexts/ModalContext';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Provider>
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
      </Provider>
    </BrowserRouter>
  );
}
