import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);

  const [text, setText] = useState("");
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    setText("");
  }, []);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" hidden multiple />
        <Button>이미지 업로드</Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ float: "right" }}
        ></Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((imagePath) => {
            return (
              <div key={imagePath}>
                <img src={imagePath} />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            );
          })}
      </div>
    </Form>
  );
};

export default PostForm;
