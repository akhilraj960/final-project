import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const ProductLayout = () => {
  return (
    <>
      <Container>
        <ProductHeader>
          <Link to={"/admin/product"}>Products</Link>
          <Link to={"/admin/product/add"}>Add product</Link>
        </ProductHeader>
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  height: 100%;
  gap: 40px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 100%;
  height: 80px;
  background-color: #07002c;
  a {
    color: white;
    padding: .7rem 1rem;
    border-radius: 10px;
    &:hover {
      background-color: #19057ce6;
    }
  }
`;

export default ProductLayout;
