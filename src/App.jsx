import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { Provider } from './contexts/LocalStateContext';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Body />
        <Footer />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Provider>
  );
}
