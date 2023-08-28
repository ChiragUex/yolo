import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.PROTOCOL}${process.env.API_URL}`;

export const getServices = createAsyncThunk(
  'dashboard/slices',
  async (data, thunkAPI) => {
    try {
      const services = await axios.post(`${API_URL}/services`);
      return {
        status: true,
        data: services.data,
      };
    } catch (err) {
      return {
        status: false,
        data: [],
        errors: err,
      };
    }
  }
);

export const ServicesSlice = createSlice({
  name: 'servicesSlice',
  initialState: { data: [], isLoading: false },
  reducers: {},
  extraReducers: {
    [getServices.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload || [];
    },
    [getServices.reject]: (state, action) => {
      state.isLoading = false;
    },
    [getServices.pending]: (state, action) => {
      state.isLoading = true;
    }
  },
});

export default ServicesSlice.reducer;
