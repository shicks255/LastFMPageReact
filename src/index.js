import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import service from './serviceWorker';

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

ReactDOM.render(
  App(),
  document.getElementById('root'),
);
