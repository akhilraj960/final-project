import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:5000/api/product",
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

const addProduct = async (productData) => {
  try {
    const response = await instance.post("/addproduct", productData);
    return response.data; // Assuming your response includes data with products and a message
  } catch (error) {
    // Log or handle the error as needed
    console.error("Error in addProduct:", error);
    throw error; // Propagate the error to the calling code
  }
};

const allProducts = async () => {
  try {
    const response = await instance.get("/allproduct");
    return response.data; // Assuming your response includes data with products and a message
  } catch (error) {
    // Log or handle the error as needed
    console.error("Error in allProducts:", error);
    throw error; // Propagate the error to the calling code
  }
};

const productService = {
  addProduct,
  allProducts,
};

export default productService;
