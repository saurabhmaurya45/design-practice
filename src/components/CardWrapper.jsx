import React from "react";

const CardWrapper = ({ children, className }) => {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-tl from-[#f0f4ff] to-[#ffffff] shadow-md p-2 m-2 rounded-lg ${className} `}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
