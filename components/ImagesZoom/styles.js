import styled, { createGlobalStyle } from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

export const Global = createGlobalStyle`
  .slick-track {
    display: flex;
    align-items: center;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Header = styled.div`
  height: 44px;
  background: white;
  position: relative;
  text-align: center;
`;

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #2c2c2c;
`;

export const Indicator = styled.div`
  border-radius: 15px;
  height: 30px;
  width: 100px;
  background: gray;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  span {
    color: white;
  }
`;

export const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 750px;
  }
`;
