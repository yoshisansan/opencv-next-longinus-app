/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

type HamburgerLineType = {
  isOpenBool: boolean;
};
export const HamburgerLine = styled.div<HamburgerLineType>`
  position: absolute;
  width: 100%;
  height: 32px;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  @media screen and (max-width: 480px) {
    width: 80%;
  }
  &:before {
    position: absolute;
    background: #030d1b;
    width: 100%;
    height: 2px;
    top: ${(props) => (props.isOpenBool ? '50%' : '38%')};
    content: '';
    display: block;
    transform: ${(props) => (props.isOpenBool ? 'rotate(45deg)' : '0')};
  }
  &:after {
    position: absolute;
    background: #030d1b;
    width: 100%;
    height: 2px;
    top: ${(props) => (props.isOpenBool ? '50%' : '62%')};
    content: '';
    display: block;
    transform: ${(props) => (props.isOpenBool ? 'rotate(-45deg)' : '0')};
  }
`;
export const HamburgerOpen = styled.div`
  position: absolute;
  width: 100%;
  height: 32px;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  &:before {
    position: absolute;
    background: #030d1b;
    width: 100%;
    height: 2px;
    top: 50%;
    content: '';
    display: block;
    transform: rotate(45deg);
  }
  &:after {
    position: absolute;
    background: #030d1b;
    width: 100%;
    height: 2px;
    top: 50%;
    content: '';
    display: block;
    transform: rotate(-45deg);
  }
`;
