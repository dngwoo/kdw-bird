import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";

const CommentForm = ({ post }) => {
  //   const id = useSelector((state) => state.user.me?.id);

  const [commentText, setCommentText] = useState("");
  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    setCommentText("");
    console.log(post.id, commentText);
  }, []);

  return (
    <Form onFinish={onSubmit}>
      <Form.Item style={{ margin: 0, position: "relative" }}>
        <Input.TextArea
          maxLength={140}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button
          style={{ position: "absolute", right: "0", bottom: "-40px" }}
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
