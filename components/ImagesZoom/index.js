import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Global,
  Overlay,
  Header,
  SlickWrapper,
  Indicator,
  ImageWrapper,
  CloseBtn,
} from './styles';

const Imageszoom = ({ images, onClose }) => {
  // 현재 슬라이드 위치를 표시하기 위한 state
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay style={{ zIndex: 3000 }}>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <Slick
          initialSlide={0}
          beforeChange={(prevSlide, currentSlide) =>
            setCurrentSlide(currentSlide)
          }
          infinite
          arrows={false}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {images.map((v) => (
            <ImageWrapper key={v.src}>
              <img src={v.src} alt={v.src} />
            </ImageWrapper>
          ))}
        </Slick>
        <Indicator>
          <span>
            {currentSlide + 1} / {images.length}
          </span>
        </Indicator>
      </SlickWrapper>
    </Overlay>
  );
};

Imageszoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  onClose: PropTypes.func.isRequired,
};

export default Imageszoom;
