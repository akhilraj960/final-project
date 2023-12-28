import React, { useEffect, useState } from "react";
import styled from "styled-components";
import validator from "validator";
import Input from "../../components/FormControls/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Center, ErrorText } from "../../styled/Styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/Auth/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "testtest",
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

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

    if (!validator.isEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }

    if (!validator.isLength(password, { min: 6 })) {
      setIsPasswordValid(true);
      return;
    } else {
      setIsPasswordValid(false);
    }

    await dispatch(login(formData));
  };

  return (
    <Center>
      <FormContainer>
        {/* <RxAvatar size={40} style={{ backgroundColor: "transparent" }} /> */}
        <Title>
          <h2>Sign in</h2>
          <p>Welcome Back</p>
        </Title>

        <InputContainer>
          <Input
            label={"email"}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {isEmailValid && <ErrorText>Email is not valid.</ErrorText>}

          <Input
            label={"password"}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          {isPasswordValid && (
            <ErrorText>Password must be at least 6 characters long.</ErrorText>
          )}
        </InputContainer>

        <Button onClick={handleSubmit}>Sign in</Button>
        <span>
          <p>
            Don't have an Account. <Link to={"/register"}>Register Now</Link>
          </p>
        </span>
      </FormContainer>
    </Center>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
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

export default LoginPage;
