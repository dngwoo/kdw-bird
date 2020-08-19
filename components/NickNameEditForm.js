import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const NickNameEditForm = () => {
  const style = useMemo(
    () => ({
      margin: "10px 0px",
      border: "1px solid #d9d9d9",
      padding: "20px",
    }),
    []
  );
  return (
    <Form style={style}>
      <Input.Search addonBefore="닉네임" enterButton></Input.Search>
    </Form>
  );
};

NickNameEditForm.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default NickNameEditForm;
