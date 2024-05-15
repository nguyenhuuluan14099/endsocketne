import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";

const PostFeatureItemStyle = styled.div`
  .feature-item {
    position: relative;
    width: 100%;
    height: 100%;

    .overplay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      z-index: 5;
      border-radius: 10px;
      overflow: hidden;
    }
    .feature-info {
      position: absolute;
      top: 0;
      color: #fff;
      z-index: 10;
      padding: 20px;
      border-radius: 10px;

      .info-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .color-dot {
          background-color: #fff;
          text-shadow: 0px 0px 1px solid #fff;
        }
      }
      .newest-title a {
        color: #fff;
      }
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostFeatureItemStyle>
      <div className="overflow-hidden feature-item">
        <div className="overplay"></div>
        <PostImage
          url={data.image}
          className="object-cover h-[350px] w-full rounded-xl"
        ></PostImage>
        <div className="w-full feature-info">
          <div className="flex justify-between info-header">
            {data.category.name && (
              <PostCategory to={data.category.slug} type="secondary">
                {data.category?.name}
              </PostCategory>
            )}
            <PostMeta
              title={data.user?.fullname}
              colorAuthor
              date={formatDate}
              authorName={data.user?.fullname.slice(0, 5) + "..."}
              className="color-dot"
              to={slugify(data.user?.fullname || "", { lower: true })}
            ></PostMeta>
          </div>
          <PostTitle to={data?.slug} size="medium">
            {" "}
            {data.title}
          </PostTitle>
        </div>
      </div>
    </PostFeatureItemStyle>
  );
};

export default PostFeatureItem;
