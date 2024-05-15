import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components";

const PostMetaStyle = styled.div`
  display: flex;
  align-items: center;
  .white-dot {
    background-color: gray;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    margin: 0px 5px;
  }
  .author-name a {
    color: ${(props) => props.colorAuthor === true && css`#fff`};
  }
`;
const PostMeta = ({
  date = "Mar 23",
  authorName = "Andiez Le",
  className = "",
  className01 = "",
  to = "",
  title = "",
}) => {
  return (
    <PostMetaStyle className={className01}>
      <p>{date}</p>
      <p className={`white-dot ${className}`}></p>
      <p className="author-name">
        <Link title={title} to={`/author/${to}`}>
          {authorName}
        </Link>
      </p>
    </PostMetaStyle>
  );
};

export default PostMeta;
