import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";
import wrapper from "../store/configureStore";

import withReduxSaga from "next-redux-saga"; // HOC 제공

const _app = ({ Component }) => {
  return (
    <>
      <Head>
        <title>KdwBird</title>
      </Head>
      <Component />
    </>
  );
};

_app.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(_app));
