import { Button } from "components/button";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFoundPageStyled = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171750;
  color: #fff;
  .notfound-page-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button-back {
    width: 300px;
  }
  .heading {
    display: block;
    margin: 20px 0px;
    font-size: 40px;
    font-weight: bold;
  }
`;
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundPageStyled>
      <div className="notfound-page-wrap">
        <a href="/">
          <img srcSet="/logo.png 2x" alt="" />
        </a>
        <h2 className="heading">NotFoundPage Opp!!</h2>
        <Button to="/" type="button" className="button-back">
          Back to Home
        </Button>
      </div>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
