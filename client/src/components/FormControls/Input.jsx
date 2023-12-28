import React, { useState } from "react";
import styled from "styled-components";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Input = ({ type, name, onChange, value, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField>
      <Label>{label ? label : "label"}</Label>
      <InputContainer>
        <StyledInput
          name={name}
          value={value}
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          onChange={onChange}
        />
        {type === "password" && (
          <ToggleIcon type={type} onClick={handleTogglePassword}>
            {showPassword ? (
              <IoEyeOutline size={20} />
            ) : (
              <IoEyeOffOutline size={20} />
            )}
          </ToggleIcon>
        )}
      </InputContainer>
    </TextField>
  );
};

const TextField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 260px;
  background-color: transparent;
`;

const Label = styled.label`
  color: #080808;
  font-size: 14px;
  margin-bottom: 5px;
  background-color: transparent;
  text-transform: capitalize;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #475569;
  border-radius: 5px;
  background-color: white;
  transition: border-color 0.15s ease-in-out;
  &:focus-within {
    border-color: #5c90ff;
    box-shadow: 0 0 5px rgba(92, 144, 255, 0.7);
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  font-size: 0.9rem;
  border: none;
  outline: none;
  background-color: transparent;
  color: #333;
`;

const ToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #475569;
`;

export default Input;
