import React from "react";
import { Card, Popover, Button, Avatar } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import PostImages from "./PostImages";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me && state.user.me.id);
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          <HeartOutlined key="heart" />,
          <MessageOutlined key="comment" />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button>삭제</Button>
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
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        ></Card.Meta>
      </Card>
      {/* <CommentForm />
      <Comments /> */}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
