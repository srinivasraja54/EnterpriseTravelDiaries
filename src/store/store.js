// store.js
import { configureStore } from '@reduxjs/toolkit';
import travelBlogsReducer, {
  fetchTravelBlogs,
  createTravelBlog,
  updateTravelBlog,
  deleteTravelBlog,
} from './travelBlogsSlice';

import travelBlogReducer, {
  findTravelBlog
} from './travelBlogSlice';

import searchBlogReducer, {
  searchTravelBlog
} from './searchBlogSlice';

import userReducer from './userProfileSlice';

const store = configureStore({
  reducer: {
    travelBlogs: travelBlogsReducer,
    travelBlog: travelBlogReducer,
    blogResults: searchBlogReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    // Customize the serializableCheck middleware
    serializableCheck: false, // Disable strict serializability checks
  }),
});

// Export the async thunks to be used in components
export { fetchTravelBlogs, createTravelBlog, updateTravelBlog, deleteTravelBlog, findTravelBlog, searchTravelBlog};

export default store;
