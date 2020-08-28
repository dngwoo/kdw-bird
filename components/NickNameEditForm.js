import React, { useMemo } from 'react';
import { Form, Input } from 'antd';

const NickNameEditForm = () => {
  const style = useMemo(
    () => ({
      margin: '10px 0px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    []
  );
  return (
    <Form style={style}>
      <Input.Search addonBefore="닉네임" enterButton></Input.Search>
    </Form>
  );
};

export default NickNameEditForm;
