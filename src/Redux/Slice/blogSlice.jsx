import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Api from "../../Api";

export const getAllBlogsAction = createAsyncThunk(
  "blogs/get-all",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.get("/blog");
      return response.data;
    } catch (error) {
      console.log("--------------------");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
// <--------- Fetch One Blog --------->
export const fetchBlogById = createAsyncThunk(
  "blog/get",
  async (BlogId, { rejectWithValue }) => {
    try {
      const res = await Api.get(`/blog/${BlogId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// <--------- Create New Blog --------->
export const createBlog = createAsyncThunk(
  "blog/create",
  async (blogData, { rejectWithValue }) => {
    try {
      console.log("------------------", blogData);
      const res = await Api.post("/blog/create", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// <--------- Update Blog --------->
export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ BlogId, updatedBlogData }, { rejectWithValue }) => {
    try {
      const res = await Api.put(`/blog/${BlogId}`, updatedBlogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// <--------- Delete Blog --------->
export const deleteBlogAction = createAsyncThunk(
  "blog/delete",
  async (BlogId, { rejectWithValue }) => {
    try {
      const res = await Api.delete(`/blog/${BlogId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// <--------- Initial State--------->

// <--------- Slice --------->
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    currentBlog: null,
    // blogToEdit: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // <--------- Fetch All Blogs --------->
    builder.addCase(getAllBlogsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllBlogsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.blogs = action.payload.data;
    });
    builder.addCase(getAllBlogsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // <--------- Fetch One Blog --------->
    builder.addCase(fetchBlogById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentBlog = action.payload.data;
    });
    builder.addCase(fetchBlogById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // <--------- Create New Blog --------->
    builder.addCase(createBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createBlog.rejected, (state, action) => {
      state.loading = false;

      if (action.payload && Array.isArray(action.payload.error)) {
        action.payload.error.map((err) => toast.error(err.message));
      } else if (action.payload && action.payload.error) {
        state.error = action.payload;
      } else {
        state.error = "Something went wrong!";
      }
    });

    // <--------- Update Blog --------->
    builder.addCase(updateBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload;

      if (action.payload && Array.isArray(action.payload.error)) {
        action.payload.error.map((err) => toast.error(err.message));
      } else if (action.payload && action.payload.error) {
        state.error = action.payload;
      } else {
        state.error = "Something went wrong!";
      }
    });

    // <--------- Delete Blog --------->
    builder.addCase(deleteBlogAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBlogAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteBlogAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default blogSlice.reducer;