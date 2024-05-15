
import PropTypes from "prop-types";
import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
const InputStyle = styled.div`
  position: relative;
  width: 100%;
  .input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "10px 60px 10px 10px" : "10px")};
    border: 2px solid transparent;
    border-radius: 6px;
    transition: all 0.3s;
    background-color: ${(props) => props.theme.grayLight};
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
const Input = ({
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
    <InputStyle hasIcon={children ? true : false}>
      <input className="input" type={type} id={name} {...field} {...props} />
      {children ? <div className="icon-input">{children}</div> : null}
    </InputStyle>
  );
};
Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.any,
  control: PropTypes.any.isRequired,
};
export default Input;
