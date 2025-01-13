import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUserData: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.loggedInUserData = action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;
