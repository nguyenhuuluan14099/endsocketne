import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const PostImageStyle = styled.div`
  /* object-fit: cover;
  width: 100%; */
`;

const PostImage = ({ url = "", className = "", to = null }) => {
  if (to)
    return (
      <NavLink to={to}>
        <PostImageStyle>
          <img src={url} alt="" className={className} />
        </PostImageStyle>
      </NavLink>
    );
  return (
    <PostImageStyle>
      <img src={url} alt="" className={className} />
    </PostImageStyle>
  );
};

export default PostImage;
