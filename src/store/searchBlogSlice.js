// travelBlogsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelBlogService from '../api';


export const searchTravelBlog = createAsyncThunk(
  'blogResults/searchTravelBlog',
  async (param) => {
    try {
      const response = await travelBlogService.search(param);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
  
const searchBlogSlice = createSlice({
    name: 'blogResults',
    initialState: {
      data: [],
      status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(searchTravelBlog.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(searchTravelBlog.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(searchTravelBlog.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });



  export default searchBlogSlice.reducer;
  
