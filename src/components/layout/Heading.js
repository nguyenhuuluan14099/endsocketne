import React from "react";
import styled from "styled-components";

const HeadingStyle = styled.div`
  margin-top: 40px;
  .header {
    /* .short-line {
      display: block;
      width: 30px;
      height: 1px;
      margin: 5px 0px;
      border: 1px solid #00d1ed;
      background-color: #00d1ed;
    } */
    .title {
      color: #3a1097;
      font-weight: 600;
      font-size: 18px;
      line-height: 36px;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: -10px;
        left: 0;
        width: 40px;
        height: 3px;
        background-color: #00d1ed;
      }
    }
  }
`;
const Heading = ({ children, className }) => {
  return (
    <HeadingStyle>
      <header className="header">
        <p className="short-line"></p>
        <p className={`title ${className}`}>{children}</p>
      </header>
    </HeadingStyle>
  );
};

export default Heading;
