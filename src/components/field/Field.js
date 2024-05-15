import React from "react";
import styled from "styled-components";

const FieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0px;
  }
`;
const Field = ({ children }) => {
  return <FieldStyled>{children}</FieldStyled>;
};

export default Field;
