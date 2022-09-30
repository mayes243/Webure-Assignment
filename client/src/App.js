import axios from "axios";
import React from "react";
import { Routes, Route } from "react-router-dom";
import FileNotFound from "./pages/FileNotFound";
import { Home } from "./pages/User";
import PrivateRoutes from "./Protected";
import { AddBlog, Dashboard, Signin, Signup } from "./pages/admin";

// baseURL is the url that will be used for all requests
axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

/* ------------------- create a interceptors of axios ------------------- */
const auth = JSON.parse(localStorage?.getItem("token"));

axios.interceptors.request.use(
  (config) => {
    if (auth?.token) config.headers.Authorization = `Bearer ${auth?.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/signin" element={<Signin />} />
      <Route path="/admin/signup" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/add" element={<AddBlog />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<FileNotFound />} />
    </Routes>
  );
};

export default App;
