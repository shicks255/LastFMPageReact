import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

export default function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Body />
      </div>
      <Footer />
    </div>
  );
}
