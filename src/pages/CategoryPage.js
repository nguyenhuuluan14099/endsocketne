import { Header } from "components/header";
import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/posts/PostItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CategoryListStyled = styled.div`
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
  /* @media screen and (min-width: 1024px) {
    .list-blog {
      --spacing: 12px;
      --columns: 2;
    }
  } */

  @media screen and (max-width: 768px) {
    .list-blog {
      --spacing: 8px;
      --columns: 1;
      padding: 20px;
    }
  }
`;
const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const colRef = query(
        collection(db, "posts"),
        where("category.slug", "==", slug)
      );
      onSnapshot(colRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [slug]);
  return (
    <div>
      <Header></Header>
      <div className="p-5">
        <Heading className="uppercase">{`Lists of ${slug}`}</Heading>
        <CategoryListStyled>
          <div className="list-blog">
            {posts.length > 0 &&
              posts.map((post) => (
                <PostItem key={post.id} data={post}></PostItem>
              ))}
          </div>
        </CategoryListStyled>
      </div>
    </div>
  );
};

export default CategoryPage;
