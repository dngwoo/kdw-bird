import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const AppLayout = ({ children }) => {
  // children = props.children와 같음.
  return (
    <div>
      <Link href="/">HOME</Link>
      <Link href="/profile">프로필</Link>
      <Link href="/signup"> 회원가입</Link>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  // node 라는 것은 리액트로 그리는 모든 것들이 node임.(return 안에 들어가는 모든것)
};

export default AppLayout;
