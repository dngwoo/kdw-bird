import React from "react";
import PropTypes from "prop-types";

const AppLayout = ({ children }) => {
  // children = props.children와 같음.
  return (
    <div>
      <span>공통메뉴</span>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  // node 라는 것은 리액트로 그리는 모든 것들이 node임.(return 안에 들어가는 모든것)
};

export default AppLayout;
