import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';


const _app = ({ Component }) => { // 여기로 모든 컴포넌트가 들어가게 된다.
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

export default wrapper.withRedux(_app);
