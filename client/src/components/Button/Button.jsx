import React from "react";
import styled, { css } from "styled-components";

const Button = ({ variant, onClick, children }) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const primaryStyles = css`
  background-color: #007bff;
  color: #fff;

  &:hover {
    background-color: #0056b3;
  }
`;

const secondaryStyles = css`
  background-color: #ffffff;
  color: #007bff;
  border: 1px solid #007bff;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const getVariantStyles = (props) => {
  switch (props.variant) {
    case "secondary":
      return secondaryStyles;
    default:
      return primaryStyles;
  }
};

const StyledButton = styled.button`
  width: 260px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${getVariantStyles}
`;

export default Button;
