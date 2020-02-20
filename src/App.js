import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {Body} from "./components/Body";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className={'container'}>
                    <Body/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
