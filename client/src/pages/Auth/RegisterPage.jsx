import React, { useEffect, useState } from "react";
import styled from "styled-components";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/FormControls/Input";
import Button from "../../components/Button/Button";
import { Center, ErrorText } from "../../styled/Styles";
import { register } from "../../redux/features/Auth/authSlice";

const RegisterPage = () => {
  let initialState = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, cPassword } = formData;

  const [errorMessage, setErrorMessage] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmptyValid, setIsEmptyValid] = useState(false);

  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || cPassword === "") {
      setErrorMessage("Fill all the fields.");
      setIsEmptyValid(true);
      return;
    } else {
      setErrorMessage("");
      setIsEmptyValid(false);
    }

    if (name.length < 4) {
      setErrorMessage("Name must be 4 letters or greater");
      setIsNameValid(true);
      return;
    } else {
      setErrorMessage("");
      setIsNameValid(false);
    }

    if (!validator.isEmail(email)) {
      setErrorMessage("Enter a Valid Email");
      setIsEmailValid(true);
      return;
    } else {
      setErrorMessage("");
      setIsEmailValid(false);
    }

    if (!validator.isLength(password, { min: 6 })) {
      setErrorMessage("Password must be at least 6 characters long.");
      setIsPasswordValid(true);
      return;
    } else {
      setErrorMessage("");
      setIsPasswordValid(false);
    }

    if (password !== cPassword) {
      setErrorMessage("Password and confirm password do not match.");
      setIsPasswordValid(true);
      return;
    } else {
      setErrorMessage("");
      setIsPasswordValid(false);
    }

    await dispatch(register(formData));
  };

  return (
    <Center>
      {isLoading && <p>loading...</p>}
      <FormContainer>
        <Title>
          <h2>Sign Up</h2>
          <p></p>
        </Title>
        {isEmptyValid && <ErrorText>{errorMessage}</ErrorText>}

        <InputContainer>
          <Input
            label={"name"}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          {isNameValid && <ErrorText>{errorMessage}</ErrorText>}

          <Input
            label={"email"}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {isEmailValid && <ErrorText>{errorMessage}</ErrorText>}

          <Input
            label={"password"}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Input
            label={"confirm password"}
            type="password"
            name="cPassword"
            value={cPassword}
            onChange={handleChange}
          />
          {isPasswordValid && <ErrorText>{errorMessage}</ErrorText>}
        </InputContainer>
        <Button onClick={handleSubmit}>Sign Up</Button>
        <span>
          <p>
            Already have an Account. <Link to={"/login"}>Login Now</Link>
          </p>
        </span>
      </FormContainer>
    </Center>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 0.6rem;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1.9rem;
  span {
    p {
      font-size: small;
    }
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0px;
  h2 {
    font-size: 1.7rem;
    font-weight: 500;
  }
  p {
    font-size: 0.9rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export default RegisterPage;
