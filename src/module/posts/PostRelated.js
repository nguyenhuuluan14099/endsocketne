import React from "react";
import PostItems from "./PostItems";

const PostRelated = ({ categoryId = "" }) => {
  return (
    <div>
      <PostItems categoryId={categoryId}></PostItems>
    </div>
  );
};

export default PostRelated;
