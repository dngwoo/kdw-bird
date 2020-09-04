import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NickNameEditForm from '../components/NickNameEditForm';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import  Router  from 'next/router';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  // 로그인 되지 않으면 접근을 못하게 막는다.
  useEffect(()=>{
    if(!(me && me.id)){
      Router.push('/');
    }
  },[me && me.id]);

  if(!me){
    return null;
  }

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
