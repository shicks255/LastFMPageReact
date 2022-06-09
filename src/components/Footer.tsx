import React from 'react';

const Footer: React.FC<Record<string, null>> = () => (
  <footer>
    <div className="pt-12 pb-4 bg-sky-900 text-center">
      <img
        alt=""
        // onClick={() => actions.setShowModal(true)}
        className="h-4 cursor-pointer inline-block text-white-200"
        src={`${process.env.PUBLIC_URL}/help-circle.svg`}
      />
      <span>What is this?</span>
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

export default Footer;
