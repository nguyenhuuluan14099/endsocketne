import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "module/layout/Layout";
import PostImage from "module/posts/PostImage";
import PostCategory from "module/posts/PostCategory";
import PostTitle from "module/posts/PostTitle";
import PostMeta from "module/posts/PostMeta";
import Heading from "components/layout/Heading";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import parse from "html-react-parser";
import Author from "components/author/Author";
import PostRelated from "module/posts/PostRelated";
import { IconEyeOpen } from "components/icon";

const PostDetailPageStyle = styled.div`
  .header {
    margin: 40px 0px;
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .bgDot {
    background-color: ${(props) => props.theme.green};
  }
  .author-name {
    color: ${(props) => props.theme.green};
  }
  .title {
    color: ${(props) => props.theme.green};
  }
`;
const PostDetailPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!slug) return null;
      const docRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);

  const { user } = postInfo;
  return (
    <PostDetailPageStyle>
      <div className="container">
        <Layout>
          <div className="header">
            <PostImage
              url={postInfo.image}
              className="img- w-full h-[500px] object-cover rounded-lg"
            ></PostImage>
            <div className="post-info">
              <PostCategory type="primary">
                {postInfo.category?.name}
              </PostCategory>
              <PostTitle
                size="big"
                className="post-title"
                className01="color-secondary"
                type="primary"
              >
                {postInfo.title}
              </PostTitle>
              <div className="flex items-center justify-between">
                <PostMeta colorDot="bgDot"></PostMeta>
                <div className="flex items-center gap-x-2">
                  <IconEyeOpen></IconEyeOpen>
                  <p className="quality">1204</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[800px] mx-auto">
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <Author userId={user?.id}></Author>
          </div>
        </Layout>

        <Heading className="font-bold">Bài viết liên quan</Heading>

        <PostRelated categoryId={postInfo?.category?.id}></PostRelated>
      </div>
    </PostDetailPageStyle>
  );
};

export default PostDetailPage;
