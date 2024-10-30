import React from "react";

const LargeContainer = ({ children }) => {
  return (
    <div className="min-h-screen max-w-[100vw] bg-cream py-12">{children}</div>
  );
};

export default LargeContainer;
