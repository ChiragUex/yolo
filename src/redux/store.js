import { configureStore } from "@reduxjs/toolkit";
import initialReducer from "./slices/intial";
import authReducer from "./slices/authReducer";

export default configureStore({
  reducer: {
    initialState: initialReducer,
    auth : authReducer
   
  },
});
