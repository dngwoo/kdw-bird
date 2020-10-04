import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const { imagePaths, addPostDone, addPostLoading } = useSelector(
    (state) => state.post
  );

  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    // 게시글이 없다면
    if(!text || !text.trim()){
      return alert('게시글을 작성하세요');
    }

    // 게시글이 있다면
    const formData = new FormData();
    imagePaths.forEach(p=>{
      formData.append('image', p);
    });
    formData.append('content', text);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData
    });
  }, [text, imagePaths]);

  // 이미지 추가 기능
  const onChangeImages = useCallback((e)=>{
    console.log('images', e.target.files); // 올린 이미지 확인 가능, e.target.files는 유사배열임.
    const imageFomeData = new FormData();
    [].forEach.call(e.target.files, (f)=>{
      imageFomeData.append('image', f); // imageFomeData.append(키, 값);  백엔드에서 upload(키)와 같아야 백엔드에서 받을 수 있다.
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFomeData
    });
  });
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click(); // 버튼이 클릭 되면 input을 클릭
  }, [imageInput.current]);

  // 이미지 제거 기능
  const onRemoveImage = useCallback((index)=>()=>{
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    });
  });

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data" // 이미지를 올리면 multpart/form-data로 올라간다.
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" hidden multiple name="image" onChange={onChangeImages} ref={imageInput}/>
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          loading={addPostLoading}
          type="primary"
          htmlType="submit"
          style={{ float: 'right' }}
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((imagePath, i) => {
            return (
              <div key={imagePath} style={{ display: 'inline-block'}}>
                <img src={`http://localhost:3065/${imagePath}`} style={{width: '200px'}} alt={imagePath}/>
                <div>
                  <Button onClick={onRemoveImage(i)}>제거</Button>
                </div>
              </div>
            );
          })}
      </div>
    </Form>
  );
};

export default PostForm;
