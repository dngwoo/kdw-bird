import React from "react";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NickNameEditForm from "../components/NickNameEditForm";
import Head from "next/head";

const Profile = () => {
  const followerList = [
    { nickname: "제로초" },
    { nickname: "멍청이" },
    { nickname: "바보" },
  ];
  const followingList = [
    { nickname: "제로초" },
    { nickname: "멍청이" },
    { nickname: "바보" },
  ];
  return (
    <>
      <Head>
        <title>KdwBird | Profile</title>
      </Head>
      <AppLayout>
        <NickNameEditForm></NickNameEditForm>
        <FollowList header="팔로잉 목록" data={followingList}></FollowList>
        <FollowList header="팔로워 목록" data={followerList}></FollowList>
      </AppLayout>
    </>
  );
};

export default Profile;
