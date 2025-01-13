import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login/loginSlice";


export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
