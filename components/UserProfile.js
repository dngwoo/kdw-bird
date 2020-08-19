import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import {
  TwitterCircleFilled,
  FacebookFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogout = useCallback(() => {
    setIsLoggedIn(false);
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

UserProfile.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default UserProfile;
