import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { Providerr } from './LocalStateContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Providerr>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="container">
          <Body />
        </div>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Providerr>
  );
}
