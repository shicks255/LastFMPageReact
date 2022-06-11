import React, { useState } from 'react';

const Footer: React.FC<Record<string, null>> = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <footer>
      <div className="pt-12 pb-4 bg-sky-900 text-center">
        <span className="text-gray-200 font-semibold">What is this</span>
        <img
          alt=""
          onClick={() => setShowInfo(true)}
          className="h-4 ml-1 cursor-pointer inline-block"
          src={`${process.env.PUBLIC_URL}/help-circle.svg`}
        />
        {showInfo && (
          <div className="text-gray-200">
            Welcome Steve FM. This site displays various metrics about Scrobble Data sourced from
            <a
              className="font-semibold"
              href="https://www.last.fm"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              LastFM
            </a>
            <br />I have been scrobbling my music listening habits pretty regularly since 2005, with
            a few short gaps here and there.
            <br />
            Feel free to edit the profile and enter your own last.fm username!
          </div>
        )}
        <div className="mt-10" />
        <a
          aria-label="Steven Hicks Home Page"
          target="_blank"
          href="https://shicks255.com"
          rel="noreferrer"
        >
          <h1 className="text-gray-200 font-bold"> &copy;&nbsp;Steven Hicks</h1>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
