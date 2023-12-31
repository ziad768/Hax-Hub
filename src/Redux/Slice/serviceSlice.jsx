import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import Api from "../../Api";

export const getAllServices = createAsyncThunk(
  "services/get-all",
  async (text,{ rejectWithValue }) => {
    try {
      console.log(text);
      const response = await Api.get("/services/get-all");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getService = createAsyncThunk(
  "services/get-one",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/services/${_id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createService = createAsyncThunk(
  "services/create",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/services/create", serviceData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateService = createAsyncThunk(
  "services/update",
  async ({ _id, serviceData }, { rejectWithValue }) => {
    try {
      console.log(_id, serviceData);
      const response = await Api.patch(`/services/${_id}`, serviceData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteServiceAction = createAsyncThunk(
  "users/delete-service",
  async ({ _id }, { rejectWithValue }) => {
    try {
      console.log(_id);
      const response = await Api.delete(`/services/${_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    service: null,
    services: [],
    getService: null,

    loading: false,
    error: null,
    success: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServices.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        console.log("all users", payload);
        state.services = payload.data;
      })
      .addCase(getAllServices.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.getUser = payload.data;
      })
      .addCase(updateService.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            console.log(payload.error);
            payload.error.map((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })

      .addCase(deleteServiceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteServiceAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
        state.success = payload.success;
      })
      .addCase(getService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getService.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.getService = payload.data;
      })
      .addCase(getService.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload.error;
        state.success = payload.success;
      })
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createService.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (Array.isArray(payload.error)) {
            console.log(payload.error);
            payload.error.map((err) => toast.error(err.message));
          } else if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      });
  },
});
export default serviceSlice.reducer;
