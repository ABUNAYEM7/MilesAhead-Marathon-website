import React from 'react';
import bgImage from '../../assets/bg.svg';

const Info = ({ title, subtitle }) => {
  return (
    <div
      className="relative min-h-[400px] w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-11/12 mt-5 bg-black/50 backdrop-blur-md text-white p-6 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg font-light">{subtitle}</p>
      </div>
    </div>
  );
};

export default Info;
