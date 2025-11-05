import FooterSection from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <FooterSection />
    </>
  );
};

export default layout;
