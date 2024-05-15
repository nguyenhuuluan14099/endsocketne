import { Button } from "components/button";
import { useAuth } from "contexts/Auth-context";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const DashboardHeaderStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.grayLight};
  padding: 10px;
  .logo {
    width: 50px;
  }
  .logo-nav {
    display: block;
  }
  .header-right {
    display: flex;
    gap: 20px;
    align-items: center;
    .user-img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      object-fit: cover;
    }
  }
  .header-button {
    height: 50px;
    width: 220px;
  }
`;
const DashboardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <DashboardHeaderStyle>
      <NavLink to="/" className="logo-nav">
        <img srcSet="/logo.png 2x" alt="" className="hidden logo" />
        <span className="hidden">Monkey Blogging</span>
      </NavLink>
      <div className="header-right">
        <Button to="/manage/post-add" type="button" className="header-button">
          Write new post
        </Button>
        <Link to="/profile" className="header-avatar">
          <img src={userInfo?.avatar} alt="" className="user-img" />
        </Link>
      </div>
    </DashboardHeaderStyle>
  );
};

export default DashboardHeader;
