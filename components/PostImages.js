import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';

const PostImage = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  // image를 누를 경우 확대
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  // <ImagesZoom>를 누를 경우 닫기
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          style={{ maxHeight: '500px' }}
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && (
          <ImagesZoom images={images} onClose={onClose}></ImagesZoom>
        )}
      </>
    );
  } else if (images.length === 2) {
    return (
      <>
        <img
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && (
          <ImagesZoom images={images} onClose={onClose}></ImagesZoom>
        )}
      </>
    );
  } else {
    return (
      <>
        <img
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          onClick={onZoom}
        >
          <PlusOutlined style={{ marginBottom: '15px' }} />
          <br />
          <span>{images.length - 1}개 사진 더보기</span>
        </div>
        {showImagesZoom && (
          <ImagesZoom images={images} onClose={onClose}></ImagesZoom>
        )}
      </>
    );
  }
};

PostImage.proptypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImage;
