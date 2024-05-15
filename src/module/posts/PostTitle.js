import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components";

const PostTitleStyle = styled.div`
  font-weight: 600;
  line-height: 28px;
  margin: 10px 0px;

  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 22px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 36px;
      line-height: 48px;
    `};

  /* .color-black {
    color: #000;
  } */
  .color-secondary {
    color: ${(props) => props.theme.green};
  }
`;
const PostTitle = ({
  type = "primary",
  title = "",
  children,
  className = "",
  className01 = "",
  size = "normal",
  to = "",
}) => {
  return (
    <PostTitleStyle size={size} className={`newest-title ${className}`}>
      <Link
        title={title}
        className={` ${className01}`}
        to={`/${to}`}
        type={type}
      >
        {children}
      </Link>
    </PostTitleStyle>
  );
};

export default PostTitle;
