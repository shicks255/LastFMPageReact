import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
// import service from './serviceWorker';
import { Providerr } from './LocalStateContext';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('./serviceWorker.js')
//             .then(
//                 (good) => console.log('service worker installed'),
//                 (bad) => console.log(bad));
//     });
// }

const queryClient = new QueryClient();

ReactDOM.render(
  <Providerr>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Providerr>,
  document.getElementById('root'),
);
