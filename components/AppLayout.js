import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu } from "antd";

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
      <Menu.Item key="signup">
        <Link href="signup">
          <a>SignUp</a>
        </Link>
      </Menu.Item>
    </Menu>
    {children}
  </>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
