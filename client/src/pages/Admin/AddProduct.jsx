import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/FormControls/Input";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/features/Product/productSlice";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    subCategory: "",
    price: "",
    stock: "",
    discountAmount: "",
    taxAmount: "",
    image: null,
  });

  const dispatch = useDispatch();

  const {
    name,
    category,
    brand,
    subCategory,
    price,
    stock,
    discountAmount,
    taxAmount,
  } = formData;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addProduct(formData));
  };

  return (
    <Container>
      <h2>ADD New Product</h2>

      <Input
        label={"Product name"}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />

      <InputContainer>
        <Input
          label={"Category"}
          type="text"
          name="category"
          value={category}
          onChange={handleChange}
        />
        <Input
          label={"Sub Category"}
          type="text"
          name="subCategory"
          value={subCategory}
          onChange={handleChange}
        />
        <Input
          label={"Brand"}
          type="text"
          name="brand"
          value={brand}
          onChange={handleChange}
        />
        <Input
          label={"Price"}
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
        />
        <Input
          label={"Stock"}
          type="number"
          name="stock"
          value={stock}
          onChange={handleChange}
        />
        <Input
          label={"Discount Amount"}
          type="number"
          name="discountAmount"
          value={discountAmount}
          onChange={handleChange}
        />
        <Input
          label={"Tax Amount (%)"}
          type="number"
          name="taxAmount"
          value={taxAmount}
          onChange={handleChange}
        />
      </InputContainer>
      <Input label={"Image"} type="file" name="image" onChange={handleChange} />

      <SubmitButton
        whileTap={{ scale: 1.01, duration: 0.5 }}
        onClick={handleSubmit}
      >
        Add Product
      </SubmitButton>
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

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  color: white;
  background-color: #007bff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export default AddProduct;
