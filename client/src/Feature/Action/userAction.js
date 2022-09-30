import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user sign up
export const signUp = createAsyncThunk(
  "user/signUp",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/user/signup`, datas);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// user sign in
export const signIn = createAsyncThunk(
  "user/signin",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/user/signin`, datas);
      if (response.status === 200) {
        datas.navigate("/dashboard");
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBlog = createAsyncThunk(
  "user/addBlog",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/blog/add`, datas);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBlogs = createAsyncThunk(
  "user/getAllBlogs",
  async (datas, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/blog/show`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
