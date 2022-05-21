import React from 'react';

const Header: React.FC<Record<string, null>> = () => (
  <nav className="p-2 bg-sky-900" role="navigation" aria-label="main navigation">
    <div className="p-4 w-full md:w-9/12">
      <a href="/">
        <img
          className="max-h-20 inline"
          alt="Steve FM Logo"
          src={`${process.env.PUBLIC_URL}/LastFmReactTitle.png`}
        />
      </a>
    </div>
    <div className="pl-4 p-2 md:p-4">
      <h1 className="text-gray-200 font-bold">Last FM Listening Habits</h1>
    </div>
  </nav>
);

export default Header;
