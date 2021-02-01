import React from 'react';

const Header: React.FC<Record<string, null>> = (() => (
  <nav className="navbar columns" role="navigation" aria-label="main navigation">
    <div className="column is-3 bannerImage">
      <a href="/">
        <img alt="Steve FM Logo" src={`${process.env.PUBLIC_URL}/LastFmReactTitle.png`} />
      </a>
    </div>

    <div className="column is-9 has-text-centered">
      <h1 className="title">
        Last FM Listening Habits
      </h1>
    </div>
  </nav>
));

export default Header;
