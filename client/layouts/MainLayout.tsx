import Navbar from "@/components/Navbar";
import { Container } from "@mui/system";
import React from "react";

interface ILayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="main-layout">{children}</div>
      </Container>

      <style jsx>
        {`
          .main-layout {
            margin: 90px 0;
          }
        `}
      </style>
    </>
  );
};

export default MainLayout;
