import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore.js';
import { END } from 'redux-saga';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts,  loadPostLoading, retweetError } = useSelector((state) => state.post);

  // 자기자신을 리트윗 했을 때 등 에러났을 경우
  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(()=>{
    // 화면이 끝까지 내려졌을 때 LOAD_POSTS_REQUEST를 발생시켜서 데이터를 더 받아옴.
    function onScroll(){
      console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
      if(hasMorePosts && !loadPostLoading){
          const lastId = mainPosts[mainPosts.length - 1]?.id; // 가장 마지막 포스트의 id를 들고옴
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    // 이벤트는 항상 없애줘야 함.
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  },[hasMorePosts, loadPostLoading]);


  return (
    <AppLayout>
      {/* 로그인되었을 경우 PostForm 출력 */}
      {me && <PostForm />}

      {/* 들어가면 포스트들이 보이게 출력 */}
      {mainPosts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
  console.log('getServerSideProps start');
  console.log(context);
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Home;
