import React from "react";

const CardWrapper = ({ children, className }) => {
  return (
    <div className="p-2 w-full flex items-center justify-center">
      <div
        className={`flex items-center justify-center bg-gradient-to-tl from-[#f0f4ff] to-[#ffffff] shadow-md p-2 rounded-lg ${className} `}
      >
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
