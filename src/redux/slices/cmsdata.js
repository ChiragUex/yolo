import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const getCMSData = createAsyncThunk(
    'cms/get',
    async (data, thunkAPI) => {

        try {
            const query = await axios.get(
                `${process.env.URL_CMS}/api/employee-app-query`
            );
            const content = await axios.post(`${process.env.URL_CMS}/graphql`, {
                query: query.data.data.attributes.query,
            });

            return content.data.data.employeeApp.data.attributes.CMS;
        } catch (err) {
            return { isError: true, err: err }
        }
    }
)

export const CMSSlice = createSlice({
    name: "cmsSlice",
    initialState: { data: {}, isLoading: false },
    reducers: {
    },
    extraReducers: {
        [getCMSData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [getCMSData.reject]: (state, action) => {
            state.isLoading = false;
        },
        [getCMSData.pending]: (state, action) => {
            state.isLoading = true;
        }
    },

})

export default CMSSlice.reducer;