import React from 'react';

// import './App.css';
// import 'bulma/css/bulma.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import { ApiContextProvider } from './contexts/ApiContext';
import { Provider } from './contexts/LocalStateContext';
import { ModalContextProvider } from './contexts/ModalContext';

const queryClient = new QueryClient();

const App: React.FC<null> = () => {
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
};

export default App;
