import React from 'react';

const Footer: React.FC<Record<string, null>> = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      &copy;&nbsp;
      <a
        aria-label="Steven Hicks Home Page"
        target="_blank"
        href="https://shicks255.com"
        rel="noreferrer"
      >
        Steven Hicks
      </a>
    </div>
  </footer>
);

export default Footer;
