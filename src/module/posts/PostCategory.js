import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components";

const PostCategoryStyle = styled.div`
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.bgPrimary};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: ${(props) => props.theme.bgSecondary};
    `};
  padding: 1px 5px;
  display: inline-block;
  color: ${(props) => props.theme.gray6B};
  border-radius: 8px;
`;
const PostCategory = ({ children, type = "primary", to = "" }) => {
  return (
    <PostCategoryStyle type={type}>
      <Link to={`/category/${to}`}>{children}</Link>
    </PostCategoryStyle>
  );
};

export default PostCategory;
