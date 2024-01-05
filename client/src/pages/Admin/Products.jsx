import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/product/allproduct",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>All Products</h2>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh> ID</StyledTh>
              <StyledTh> Image</StyledTh>
              <StyledTh> Name</StyledTh>
              <StyledTh>Brand</StyledTh>
              <StyledTh>Stock</StyledTh>
              <StyledTh>Price</StyledTh>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <StyledTd>{product._id}</StyledTd>
                <StyledTd>
                  <img
                    style={{ width: "100px" }}
                    src={`http://localhost:5000/public/product-images/${product._id}.jpg`}
                  />
                </StyledTd>
                <StyledTd>{product.name}</StyledTd>
                <StyledTd>{product.brand}</StyledTd>
                <StyledTd>{product.stock}</StyledTd>
                <StyledTd>${product.price}</StyledTd>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  overflow: scroll;

  h2 {
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TableWrapper = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  border: 1px solid #dddddd;
  text-align: left;
`;

const StyledTd = styled.td`
  padding: 10px;
  border: 1px solid #dddddd;
`;

export default Products;
