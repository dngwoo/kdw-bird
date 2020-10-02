import React, { useState, useCallback } from 'react';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import PostImages from './PostImages';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST, REMOVE_COMMENT_REQUEST } from '../reducers/post';
import Followbutton from './FollowButton';

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const {removePostLoading, removeCommentLoading} = useSelector((state)=> state.post);
  const [liked, setLiked] = useState(false);
  const onToggleLike = useCallback(() => setLiked((prev) => !prev), []);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(
    () => setCommentFormOpened((prev) => !prev),
    []
  );
  const dispatch = useDispatch();

  // post 삭제
  const onRemovePost = useCallback(()=>{
    dispatch({
      type: REMOVE_POST_REQUEST, // 타입이름은 항상 직관적, 규칙적으로!
      data: post.id
    });
  },[]);

  // comment 삭제
  const onRemoveComment = useCallback((id)=>{
    dispatch({
      type: REMOVE_COMMENT_REQUEST, // 타입이름은 항상 직관적, 규칙적으로!
      data: id
    });
  },[]);
  return (
    <>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra = { id && <Followbutton post={post}/>}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        ></Card.Meta>
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <List.Item>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                  actions= {[
                    <Button.Group key="button">
                    {id && id === item.id ? (
                      <>
                        <Button>수정</Button>
                        <Button type="danger" onClick={onRemoveComment(item.id)} loading={removeCommentLoading}>삭제</Button>
                      </>
                    ) : (
                      <Button>신고</Button>
                    )}
                  </Button.Group>
                  ]}
                />
              </List.Item>
            )}
          />
        </>
      )}
      {/* <CommentForm />
      <Comments /> */}
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
