import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/Auth/authSlice";
const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const hover = {
    scale: 1.2,
    transition: { duration: 0.3 },
    // color: "gray",
  };

  return (
    <StyledHeader>
      <Logo>
        Shop<span>ito</span>
      </Logo>

      <Nav>
        <NavLink to={"/"}>Home</NavLink>
        {!isLoggedIn ? (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/register"}>Register</NavLink>
          </>
        ) : (
          <NavLink onClick={handleLogout}>Logout</NavLink>
        )}
        {isLoggedIn && user?.role === "admin" ? (
          <NavLink to={"/admin"}>Admin View</NavLink>
        ) : null}
      </Nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: 10vh;
  background-color: #1e40af;
  align-items: center;
  display: flex;
  justify-content: space-around;
`;

const Logo = styled(motion.p)`
  font-size: 1.2rem;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  color: white;
  span {
    color: #f97316;
  }
`;

const Nav = styled(motion.nav)`
  display: flex;
  gap: 30px;
  padding: 1rem;
`;

const NavLink = styled(motion(Link))`
  text-decoration: none;
  padding: 0.5rem 0.8rem;
  color: white;
`;

export default Header;
