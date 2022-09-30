import { createSlice } from "@reduxjs/toolkit";
import { addBlog, getAllBlogs, signIn, signUp } from "../Action/userAction";
import { toast } from "react-toastify";

const UserReducer = createSlice({
  name: "User",
  initialState: {
    user: [],
    address: [],
    allAddress: [],
    profile: [],
    loader: false,
    error: "",
    success: "",
    blogs: [],
  },
  reducers: {},
  extraReducers: {
    /* -------------------------- signin user -------------------------- */
    [signIn.pending]: (state, action) => {
      state.loader = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loader = false;
      // state.user = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    [signIn.rejected]: (state, action) => {
      state.loader = false;
      state.error = action.payload.message;
      toast.error(action.payload.message);
    },
    /* -------------------------- signup user -------------------------- */
    [signUp.pending]: (state, action) => {
      state.loader = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loader = false;
      state.user = action.payload;
      state.success = action.payload.message;
    },
    [signUp.rejected]: (state, action) => {
      state.loader = false;
      state.error = action.payload.message;
    },
    // add blog
    [addBlog.pending]: (state, action) => {
      state.loader = true;
    },
    [addBlog.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = action.payload.message;
    },
    [addBlog.rejected]: (state, action) => {
      state.loader = false;
      state.error = action.payload.message;
    },
    // get all blogs
    //
    [getAllBlogs.pending]: (state, action) => {
      state.loader = true;
    },
    [getAllBlogs.fulfilled]: (state, action) => {
      state.loader = false;
      state.blogs = action.payload;
      state.success = action.payload.message;
    },
    [getAllBlogs.rejected]: (state, action) => {
      state.loader = false;
      state.error = action.payload.message;
    },
  },
});
// export
// export const {} = UserReducer.actions;

// export default
export default UserReducer.reducer;
