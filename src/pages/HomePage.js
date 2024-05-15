import { Header } from "components/header";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import HomeBanner from "module/home/HomeBanner";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNewest";
import Layout from "module/layout/Layout";
import React from "react";
import styled from "styled-components";

const HomePageStyled = styled.div``;
const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HomePageStyled>
      <div className="container">
        <Layout>
          <HomeBanner></HomeBanner>
          <HomeFeature></HomeFeature>
          <HomeNewest></HomeNewest>
        </Layout>
      </div>

      {/* <button onClick={handleSignOut}>Sign Out</button> */}
    </HomePageStyled>
  );
};

export default HomePage;
