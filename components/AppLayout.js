import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Row, Col, Input } from "antd";
import LoginForm from "../components/LoginForm";
import UserProfile from "../components/UserProfile";

const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6} style={{ textAlign: "center" }}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          {children}
        </Col>
        <Col xs={24} md={6} style={{ textAlign: "center" }}>
          <a href="#" target="_blank" rel="noreferrer noopenner">
            Made By DongWoo
          </a>
        </Col>
      </Row>
    </>
  );
};
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
