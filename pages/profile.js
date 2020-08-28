import React from 'react';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NickNameEditForm from '../components/NickNameEditForm';
import Head from 'next/head';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>KdwBird | Profile</title>
      </Head>
      <AppLayout>
        <NickNameEditForm></NickNameEditForm>
        <FollowList header="팔로잉" data={me.Followings}></FollowList>
        <FollowList header="팔로워" data={me.Followers}></FollowList>
      </AppLayout>
    </>
  );
};

export default Profile;
