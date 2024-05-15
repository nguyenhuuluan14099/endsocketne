import React from "react";
import styled from "styled-components";

const AuthenticationStyled = styled.div`
  padding: 30px;
  min-height: 100vh;

  .logo {
    margin: 0 auto 40px;
  }
  .title {
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    text-align: center;
  }

  .form {
    margin: auto;
    max-width: 600px;

    .label {
      color: ${(props) => props.theme.grayDark};
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
  .have-account {
    margin-bottom: 20px;
    a {
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;
const Authentication = ({ children }) => {
  return (
    <AuthenticationStyled>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="" className="logo" />
        <h2 className="title">Monkey Blogging</h2>
        {children}
      </div>
    </AuthenticationStyled>
  );
};

export default Authentication;
