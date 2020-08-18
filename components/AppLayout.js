import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Row, Col, Input } from "antd";

const AppLayout = ({ children }) => (
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
        왼쪽메뉴
      </Col>
      <Col xs={24} md={12} style={{ textAlign: "center" }}>
        {children}
      </Col>
      <Col xs={24} md={6} style={{ textAlign: "center" }}>
        오른쪽메뉴
      </Col>
    </Row>
  </>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
