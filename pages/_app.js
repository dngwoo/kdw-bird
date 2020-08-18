import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";

const _app = ({ Component }) => {
  return <Component />;
};

_app.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default _app;
