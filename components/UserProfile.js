import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import {
  TwitterCircleFilled,
  FacebookFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { logoutRequestAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction);
  }, []);

  return (
    <>
      <Card
        actions={[
          <TwitterCircleFilled key="twit" />,
          <FacebookFilled key="followings" />,
          <GoogleCircleFilled key="followings" />,
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
              {me.nickname[0]}
            </Avatar>
          }
          title={`${me.nickname}님 환영합니다.`}
        ></Card.Meta>
        <Button onClick={onLogOut} loading={isLoggingOut}>
          로그아웃
        </Button>
      </Card>
    </>
  );
};

export default UserProfile;
