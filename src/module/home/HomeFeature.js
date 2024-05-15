import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostFeatureItem from "module/posts/PostFeatureItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HomeFeatureStyle = styled.div`
  margin: 40px 0px;

  .feature-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
`;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
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
  return (
    <HomeFeatureStyle>
      <Heading>Feature</Heading>
      <div className="feature-list">
        {posts.map((item) => (
          <PostFeatureItem key={item.id} data={item}></PostFeatureItem>
        ))}
      </div>
    </HomeFeatureStyle>
  );
};

export default HomeFeature;
