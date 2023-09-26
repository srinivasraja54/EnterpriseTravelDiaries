// travelBlogsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelBlogService from '../api';


  export const findTravelBlog = createAsyncThunk(
    'travelBlog/findTravelBlog',
    async (blog) => {
      try {
        const response = await travelBlogService.find(blog);
        return response;
      } catch (error) {
        throw error;
      }
    }
  );
  
const travelBlogSlice = createSlice({
    name: 'travelBlog',
    initialState: {
      data: [],
      status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(findTravelBlog.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(findTravelBlog.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(findTravelBlog.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });


  export default travelBlogSlice.reducer;
  
