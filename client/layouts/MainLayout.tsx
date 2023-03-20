import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import { Container } from "@mui/system";
import Head from "next/head";
import React from "react";

interface ILayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string

}

const MainLayout = ({ children, title, description, keywords}: ILayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'spotify'}</title>
        <meta name="description" content={`spotify. Тут можно добавлять свои треки, собирать их в альбомы, оставлять комментарии. ` + description }/>
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content={keywords || 'spotify, музыка, треки, альбомы, артисты'}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Navbar />
      <Container>
        <div className="main-layout">{children}</div>
      </Container>
      <Player />

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
