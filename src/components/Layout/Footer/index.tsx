import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 px-8 bg-gray-100 text-center text-gray-600 text-sm">
      <p>
        Created by Your Name, with{' '}
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900"
        >
          React
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900"
        >
          Tailwind CSS
        </a>
      </p>
    </footer>
  );
};

export default Footer;
