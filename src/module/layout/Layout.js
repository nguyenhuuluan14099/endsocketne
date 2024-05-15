import { Header } from "components/header";
import React, { Fragment } from "react";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      {children}
    </Fragment>
  );
};

export default Layout;
