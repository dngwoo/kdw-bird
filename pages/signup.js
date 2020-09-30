import React, { useState, useCallback, useEffect } from 'react';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';

const ErrorMessage = styled.div`
  color: red;
`;

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  // 커스텀 훅은 사용 못함. 조금 로직이 다르기 때문.
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
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

  const { signUpLoading, signUpDone, signUpError } = useSelector((state) => state.user);
  
  useEffect(()=>{
    // 회원가입이 끝나면 / 로 돌려보낸다. profile.js 와 비슷
    if(signUpDone){
      Router.push('/');
    }
  }, [signUpDone]);

  useEffect(()=>{
    // 회원가입 시 에러가 나면 alert로 뿌려줌
    // err.response.data가 나오는 것임.
    if(signUpError){
      alert(signUpError);
    }
  }, [signUpError]);

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>KdwBird | SignUp</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">email</label>
            <Input
              name="user-email"
              value={email}
              onChange={onChangeEmail}
              type="email"
            ></Input>
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
            <Checkbox checked={term} onChange={onChangeTerm}>관리자 말을 잘 들을 것을 동의합니다.</Checkbox>
            {termError && <ErrorMessage>약관에 동의 해주세요</ErrorMessage>}
          </div>
          <div>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default SignUp;
