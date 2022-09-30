import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Feature/Reducer/userReducer";

export const store = configureStore({
  reducer: {
    // reducer
    userReducer,
  },
});
