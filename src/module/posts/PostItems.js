import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PostCategory from "./PostCategory";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { result } from "lodash";
import slugify from "slugify";
import PostItem from "./PostItem";

const PostItemsStyle = styled.div`
  .list-blog {
    display: flex;
    flex-wrap: wrap;
    --spacing: 20px;
    --columns: 4;
    margin-left: calc(-1 * var(--spacing));
    .item-blog {
      width: calc(calc(100% / var(--columns)) - var(--spacing));
      margin-left: var(--spacing);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      .post-content {
        .post-title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          color: #000 !important;
        }
      }
    }
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */

    /* gap: 20px; */
    margin-top: 40px;
    .newest-left-info {
      margin-top: -10px;
      padding: 10px;
    }
    .img-item-block {
      min-height: 200px;
      width: 100%;
    }
  }
`;
const PostItems = ({ categoryId = "" }) => {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostData(results);
    });
  }, [categoryId]);
  if (!categoryId && postData.length > 0) return null;
  return (
    <PostItemsStyle>
      <div className="list-blog">
        {postData.slice(0, 4).map((post) => (
          <PostItem key={post.id} data={post}></PostItem>
        ))}
      </div>
    </PostItemsStyle>
  );
};

export default PostItems;
