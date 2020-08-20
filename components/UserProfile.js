import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import {
  TwitterCircleFilled,
  FacebookFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { logoutAction } from "../reducers";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction);
  }, []);

  return (
    <>
      <Card
        style={{ width: 300 }}
        actions={[
          <TwitterCircleFilled key="twit" />,
          <FacebookFilled key="followings" />,
          <GoogleCircleFilled key="followings" />,
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="김동우님 환영합니다!"
        ></Card.Meta>
        <Button onClick={onLogout}>로그아웃</Button>
      </Card>
    </>
  );
};

export default UserProfile;
