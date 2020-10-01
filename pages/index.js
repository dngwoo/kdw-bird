import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts,  loadPostLoading } = useSelector((state) => state.post);

  useEffect(()=>{
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(()=>{
    // 화면이 끝까지 내려졌을 때 LOAD_POSTS_REQUEST를 발생시켜서 데이터를 더 받아옴.
    function onScroll(){
      console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if( window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
      if(hasMorePosts && !loadPostLoading){
          dispatch({
            type: LOAD_POSTS_REQUEST
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

export default Home;
