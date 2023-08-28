import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    users: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { users } = authReducer.actions;

export default authReducer.reducer;
