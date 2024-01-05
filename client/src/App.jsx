import React, { useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import DashBoard from "./pages/Admin/DashBoard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./pages/Admin/AdminLayout";
import { getStatus, profile } from "./redux/features/Auth/authSlice";
import ProductLayout from "./components/Admin/ProductLayout";
import AddProduct from "./pages/Admin/AddProduct";
import Products from "./pages/Admin/Products";
import Users from "./pages/Admin/Users";

const App = () => {
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && !user) {
      dispatch(profile());
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    dispatch(getStatus());
  }, [isLoggedIn]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<DashBoard />} />
          <Route path="users" element={<Users />} />
          <Route path="product" element={<ProductLayout />}>
            <Route path="" element={<Products />} />
            <Route path="add" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
