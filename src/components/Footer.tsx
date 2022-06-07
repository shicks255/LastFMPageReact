import React from 'react';

const Footer: React.FC<Record<string, null>> = () => (
  <footer>
    <div className="pt-12 pb-4 bg-sky-900 text-center">
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

export default Footer;
