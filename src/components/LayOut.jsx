import React from "react";

const LayOut = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto lg:px-0 md:px-8 sm:px-6 px-4">
      {children}
    </div>
  );
};

export default LayOut;
