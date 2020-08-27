import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      {/* 로그인되었을 경우 PostForm 출력 */}
      {isLoggedIn && <PostForm />}

      {/* 들어가면 포스트들이 보이게 출력 */}
      {mainPosts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </AppLayout>
  );
};

export default Home;
