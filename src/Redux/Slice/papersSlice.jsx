import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Api from "../../Api";
import { toast } from "react-toastify";
export const getPaper = createAsyncThunk(
  "papers/getPaper",

  async (_id, { rejectWithValue }) => {
    try {
      const res = await Api.get(`/papers/${_id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
export const getAllPapers = createAsyncThunk(
  "papers/getAllPapers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.get("/papers");
      // console.log("response", response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const createPaper = createAsyncThunk(
  "papers/createPaper",
  async (papersData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/papers", papersData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePaper = createAsyncThunk(
  "papers/updatePaper",
  async ({ _id, papersData }, { rejectWithValue }) => {
    try {
      console.log(_id, papersData);
      const response = await Api.patch(
        `/papers/${_id}`,
        papersData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePaper = createAsyncThunk(
  "papers/deletePaper",
  async ( _id , { rejectWithValue }) => {
    try {
      console.log(_id);
      const response = await Api.delete(`/papers/${_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const papersSlice = createSlice({
  name: "papers",
  initialState: {
    papers: [],
    paper: null,
    error: null,
    loading: false,
    success: true,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllPapers.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(getAllPapers.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload.data);
        state.papers = payload.data;
      })
      .addCase(getAllPapers.rejected, (state, { payload }) => {
        console.log("history");
        console.log(state);
        // state.loading = false;
        // state.error = payload.error
        console.log(payload);
      })
      .addCase(getPaper.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(getPaper.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.paper = payload.data;
      })
      .addCase(getPaper.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
      })
      .addCase(updatePaper.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(updatePaper.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.success = true;

        state.papers = payload.data;
      })

      .addCase(updatePaper.rejected, (state, { payload }) => {
        state.loading = false;

        if (payload) {
          if (Array.isArray(payload.error)) {
            console.log(payload.error);

            payload.error.map((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;

            state.success = payload.success;
          } else {
            state.error = " An unknown error occurred ";
          }
        } else {
          state.error = "Network error occurred";
        }
      })

      .addCase(deletePaper.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(deletePaper.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deletePaper.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload.error;
      })
      .addCase(createPaper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaper.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPaper.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            console.log(payload.error);

            payload.error.map((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;

            state.success = payload.success;
          } else {
            state.error = " An unknown error occurred ";
          }
        } else {
          state.error = "Network error occurred";
        }
      });
  },
});

export default papersSlice.reducer;
