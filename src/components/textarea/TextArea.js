
import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const TextAreaStyle = styled.div`
  position: relative;
  width: 100%;
  .textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid transparent;
    border-radius: 6px;
    transition: all 0.3s;
    background-color: ${(props) => props.theme.grayLight};
    min-height: 200px;
    resize: none;
  }
  input::-webkit-input-placeholder {
  }
  input:focus {
    border: 2px solid ${(props) => props.theme.primary};
    background-color: #fff;
  }
  .icon-input {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const TextArea = ({
  type = "text",
  name = "",
  children,
  hasIcon = false,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextAreaStyle>
      <textarea
        className="textarea"
        type={type}
        id={name}
        {...field}
        {...props}
      />
      {children ? <div className="icon-input">{children}</div> : null}
    </TextAreaStyle>
  );
};

export default TextArea;
