// travelBlogsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelBlogService from '../api';


export const fetchTravelBlogs = createAsyncThunk(
    'travelBlogs/fetchTravelBlogs',
    async (param) => {
      try {
        const data = await travelBlogService.getBlogsByUserId(param);
        return data;
      } catch (error) {
        throw error;
      }
    }
  );

export const createTravelBlog = createAsyncThunk(
  'travelBlogs/createTravelBlog',
  async (blogData) => {
    try {
      const response = await travelBlogService.create(blogData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTravelBlog = createAsyncThunk(
    'travelBlogs/updateTravelBlog',
    async (blogData) => {
      try {
        const response = await travelBlogService.update(blogData);
        return response;
      } catch (error) {
        throw error;
      }
    }
  );

  export const deleteTravelBlog = createAsyncThunk(
    'travelBlogs/deleteTravelBlog',
    async (blogData) => {
      try {
        const response = await travelBlogService.destroy(blogData);
        return response;
      } catch (error) {
        throw error;
      }
    }
  );

  export const searchTravelBlog = createAsyncThunk(
    'travelBlogs/searchTravelBlog',
    async (param) => {
      try {
        const data = await travelBlogService.search(param);
        return data;
      } catch (error) {
        throw error;
      }
    }
  );
  
const travelBlogsSlice = createSlice({
    name: 'travelBlogs',
    initialState: {
      data: [],
      status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTravelBlogs.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTravelBlogs.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchTravelBlogs.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });


  
  export default travelBlogsSlice.reducer;

  
