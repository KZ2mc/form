import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface BaseProps {
  children: ReactNode;
}

const Base: React.FC<BaseProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Base;
