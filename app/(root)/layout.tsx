import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>navbar</div>
      {children}
      <div>Footer</div>
    </>
  );
};

export default layout;
