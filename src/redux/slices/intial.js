import { createSlice } from "@reduxjs/toolkit";

export const initialSlice = createSlice({
  name: "initialState",
  initialState: { language: "en-us" },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = initialSlice.actions;

export default initialSlice.reducer;
