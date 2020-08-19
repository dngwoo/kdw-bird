import React, { useState, useCallback } from "react";
import useInput from "../hooks/useInput";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
`;

const SignUp = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");

  // 커스텀 훅은 사용 못함. 조금 로직이 다르기 때문.
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const [termError, setTermError] = useState(false);
  const [term, setTerm] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTermError(!e.target.checked);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password, term);
  }, [password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>KdwBird | SignUp</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-id">Id</label>
            <Input name="user-id" value={id} onChange={onChangeId}></Input>
          </div>
          <div>
            <label htmlFor="user-password">Password</label>
            <Input
              name="user-password"
              value={password}
              onChange={onChangePassword}
              type="password"
            ></Input>
          </div>
          <div>
            <label htmlFor="user-password-check">Password Check</label>
            <Input
              name="user-password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              type="password"
            ></Input>
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="user-nickname">NickName</label>
            <Input
              name="user-nickname"
              value={nickname}
              onChange={onChangeNickname}
            ></Input>
          </div>
          <div>
            <Checkbox value={term} onChange={onChangeTerm}></Checkbox>
            {termError && <ErrorMessage>약관에 동의 해주세요</ErrorMessage>}
          </div>
          <div>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default SignUp;
