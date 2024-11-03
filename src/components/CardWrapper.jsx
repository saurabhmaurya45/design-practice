import React from "react";

const CardWrapper = ({ title, children, className }) => {
  return (
    <div className="p-2 w-full flex items-center justify-center">
      <div
        className={`flex items-center justify-center bg-gradient-to-tl from-[#f0f4ff] to-[#ffffff] shadow-md p-2 rounded-lg ${className} `}
      >
        <h1 className="text-4xl font-bold py-4">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
