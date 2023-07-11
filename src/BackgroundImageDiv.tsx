import React from "react";

interface BackgroundImageProps {
  imageUrl: string;
  children: React.ReactNode;
}

const BackgroundImageDiv: React.FC<BackgroundImageProps> = ({ imageUrl, children }) => {
  const divStyle: React.CSSProperties = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "600px",
  };

  return <div style={divStyle}>{children}</div>;
};

export default BackgroundImageDiv;
