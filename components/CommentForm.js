import React, { useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import useInput from "../hooks/useInput";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmit}>
      <Form.Item style={{ margin: 0, position: "relative" }}>
        <Input.TextArea
          maxLength={140}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button
          style={{
            zIndex: "1000",
            position: "absolute",
            right: "0",
            bottom: "-40px",
          }}
          type="primary"
          htmlType="submit"
        >
          삐약삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CommentForm;
