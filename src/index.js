import React from 'react';
import {Provider} from 'mobx-react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import service from './serviceWorker';
import {uiStore} from "./stores/UIStore";
import {logicStore} from "./stores/LogicStore";
import {profileStore} from "./stores/ProfileStore";

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

const stores = {
    uiStore,
    logicStore,
    profileStore,
}

ReactDOM.render(
    <Provider uiStore={stores.uiStore} logicStore={stores.logicStore} profileStore={profileStore}>
        <App />
    </Provider>,
    document.getElementById('root'));
