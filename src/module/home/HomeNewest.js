import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostCategory from "module/posts/PostCategory";
import PostItems from "module/posts/PostItems";
import PostMeta from "module/posts/PostMeta";
import PostNewestItem from "module/posts/PostNewestItem";
import PostNewestLarge from "module/posts/PostNewestLarge";
import PostTitle from "module/posts/PostTitle";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

const HomeNewestStyle = styled.div`
  margin-bottom: 300px;
  .home-newest {
    display: flex;
    align-items: center;
    gap: 30px;
    height: 580px;
    width: 100%;
    .newest-right-block {
      background-color: #f3edff;
      padding: 30px 20px;
      height: 100%;
      width: 100%;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(q, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    });
  }, []);
  if (!posts || posts.length <= 0) return null;
  const [first, ...other] = posts;

  return (
    <div className="container mb-[100vh]">
      <Heading>Newest update</Heading>
      <div className="flex items-center w-full gap-5 h-[500px]">
        <PostNewestLarge data={first}></PostNewestLarge>
        <div className="flex flex-col justify-between flex-1 w-full h-full  bg-[#f3edff] rounded-lg">
          {other.length > 0 &&
            other.map((item) => (
              <PostNewestItem key={v4()} data={item}></PostNewestItem>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeNewest;
