import { Button } from "components/button";
import { useAuth } from "contexts/Auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const categoryList = [
  {
    url: "/#",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  .header-search {
    display: flex;
    align-items: center;
    column-gap: 10px;
    .header-input-search {
      display: flex;
      align-items: center;
      border: 1px solid #cfcfcf;
      padding: 10px;
      border-radius: 8px;

      .input-search-header {
        padding-right: 20px;
      }
      .icon-search {
        display: block;
      }
    }
  }
  .lastName-user {
    color: ${(props) => props.theme.primary};
    font-weight: bold;
  }
  .logo-img {
    display: block;
    width: 30px;
  }
  .category {
    display: flex;
    align-items: center;
    column-gap: 3 0px;
    a {
      color: #000;
    }
  }
  .category-items {
    margin: 0 15px;
  }
`;

function getLastName(name) {
  if (!name) return "User";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyled>
      <div className="category">
        <NavLink to="/">
          <img srcSet="/logo.png 2x" alt="Logo Monkey" className="logo-img" />
        </NavLink>
        {categoryList.length > 0 &&
          categoryList.map((item) => (
            <div key={item.title} className="category-list">
              <NavLink className="category-items" to={item.url}>
                {item.title}
              </NavLink>
            </div>
          ))}
      </div>

      <div className="header-search">
        <div className="header-input-search">
          <input
            type="text"
            className="input-search-header"
            placeholder="Search..."
          />
          <span className="icon-search">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="7.66669"
                cy="7.05161"
                rx="6.66669"
                ry="6.05161"
                stroke="#999999"
                strokeWidth="1.5"
              />
              <path
                d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <div>
          {!userInfo ? (
            <Button to="/sign-up" type="button" style={{ width: "100%" }}>
              Sign Up
            </Button>
          ) : (
            <div>
              <Button to="/dashboard" type="button">
                Dashboard
              </Button>
              {/* <span>WelCome Back! </span>
              <span className="lastName-user">
                {getLastName(userInfo?.displayName)}
              </span> */}
            </div>
          )}
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
