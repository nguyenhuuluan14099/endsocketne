import React from "react";
import styled from "styled-components";

const LoadingSpinnerStyle = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 100rem;
  border: ${(props) => props.borderSize} solid #fff;
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  animation: rotateAnim 1s infinite linear;
  @keyframes rotateAnim {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = ({ size = "30px", borderSize = "4px" }) => {
  return (
    <LoadingSpinnerStyle
      size={size}
      borderSize={borderSize}
    ></LoadingSpinnerStyle>
  );
};

export default LoadingSpinner;
