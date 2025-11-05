import FooterSection from "@/components/footer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>navbar</div>
      {children}
      <FooterSection />
    </>
  );
};

export default layout;
