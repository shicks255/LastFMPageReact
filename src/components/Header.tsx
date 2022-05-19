import React from 'react';

const Header: React.FC<Record<string, null>> = () => (
  <nav className="p-2 bg-sky-900" role="navigation" aria-label="main navigation">
    <div className="p-2">
      <a href="/">
        <img
          className=" max-h-20"
          alt="Steve FM Logo"
          src={`${process.env.PUBLIC_URL}/LastFmReactTitle.png`}
        />
      </a>
    </div>
    <div className="p-4">
      <h1 className="text-gray-200 font-bold">Last FM Listening Habits</h1>
    </div>
  </nav>
);

export default Header;
