import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestLarge = ({ data }) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="flex flex-col flex-1 w-full h-full p-5 bg-[#f3edff] rounded-lg">
      <img
        src={data?.image}
        alt=""
        className="shrink-0 mt-auto object-cover h-[300px] rounded-lg"
      />
      <div className="flex-1 h-full p-5 item-info">
        <PostCategory to={data?.category?.slug} type="secondary">
          {data?.category.name}
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

export default PostNewestLarge;
