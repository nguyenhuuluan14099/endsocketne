import React from "react";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import { v4 } from "uuid";
import slugify from "slugify";
const PostNewestItem = ({ data }) => {
  if (!data.id) return null;
  console.log("this is", data);
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="flex items-center p-5 item">
      <PostImage
        to={data?.slug}
        url={data?.image}
        className="object-cover w-[120px] h-[120px] rounded-lg"
      ></PostImage>

      <div className="flex-1 h-full px-5 item-info">
        <PostCategory to={data?.category?.slug} type="secondary">
          {data?.category?.name}
        </PostCategory>
        <PostTitle to={data?.slug} title={data?.title} className="post-title">
          {data?.title}
        </PostTitle>
        <PostMeta
          date={formatDate}
          authorName={data.user?.fullname}
          className="color-dot"
          to={slugify(data.user?.fullname || "", { lower: true })}
        ></PostMeta>
      </div>
    </div>
  );
};

export default PostNewestItem;
