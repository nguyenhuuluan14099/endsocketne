import React from "react";
import slugify from "slugify";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItem = ({ data = [] }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data) return null;
  console.log(data);

  return (
    <div className="flex flex-col mb-16 overflow-hidden rounded-xl item-blog">
      <PostImage
        url={data?.image}
        className="object-cover w-full h-[200px] post-image shrink-0"
      ></PostImage>

      <div className="flex flex-col flex-1 p-3 post-content">
        <div className="flex-1 post-top">
          <PostCategory to={data.category.name} type="primary">
            {data?.category?.name}
          </PostCategory>
          <PostTitle
            to={slugify(data.title)}
            size="normal"
            className01="color-black"
            className="my-3 text-[16px] color-black  text-black font-bold post-title break-all"
          >
            {" "}
            {data?.title}
          </PostTitle>
        </div>
        <div className="flex items-center gap-2 mt-auto shrink-0 post-bottom">
          <PostMeta
            date={formatDate}
            authorName={data.user?.fullname}
            className="color-dot"
            to={slugify(data.user?.fullname || "", { lower: true })}
          >
            Name
          </PostMeta>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
