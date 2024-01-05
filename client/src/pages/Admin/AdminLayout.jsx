import { motion } from "framer-motion";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const AdminLayout = () => {
  return (
    <>
      <AdminContainer>
        <SideNav>
          <StyledLink to="/admin">DashBoard</StyledLink>
          <StyledLink to="/admin/product">product</StyledLink>
          <StyledLink to="/admin/users">Users</StyledLink>
        </SideNav>
        <Outlet />
      </AdminContainer>
    </>
  );
};

const AdminContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
`;

const SideNav = styled(motion.div)`
  min-width: 250px;
  height: 90vh;
  position: sticky;
  background-color: #010857;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(motion(Link))`
  color: white;
  background-color: #0b0052;
  width: 100%;
  text-align: center;
  padding: 1rem;
`;

export default AdminLayout;
