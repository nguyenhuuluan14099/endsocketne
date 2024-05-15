import { LoadingSpinner } from "components/loading";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { css } from "styled-components";

const ButtonStyle = styled.button`
  width: ${(props) => props.wFull && css`100%`} || 50%;
  margin: auto;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-image: linear-gradient(to right bottom, #fff, #fff);
    `};
  &:disabled {
    pointer-events: none;
    opacity: 0.4;
  }
`;
const Button = ({
  onClick = () => {},
  children,
  type = "button",
  kind = "primary",
  className,
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyle
          className={className}
          kind={kind}
          onClick={onClick}
          type={type}
          {...props}
        >
          {child}
        </ButtonStyle>
      </NavLink>
    );
  }
  return (
    <ButtonStyle
      className={className}
      kind={kind}
      type={type}
      onClick={onClick}
      {...props}
    >
      {child}
    </ButtonStyle>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
  to: PropTypes.string,
  kind: PropTypes.string,
};
export default Button;
