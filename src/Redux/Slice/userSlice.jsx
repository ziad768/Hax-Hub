import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../../Api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/register", userData);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const currentUser = createAsyncThunk(
  "auth/current-user",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/current-user");
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

/*********** Admin *************** */
export const getAllUsers = createAsyncThunk(
  "users/get-all",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.get("/user");
      return response.data;
    } catch (error) {
      console.log("--------------------");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// ------- Create User
export const createUser = createAsyncThunk(
  "users/create-by-admin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/user/create-by-admin", userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
// --------- Update User
export const updateUserAction = createAsyncThunk(
  "user/update-by-admin",
  async ({ _id, userData }, { rejectWithValue }) => {
    try {
      console.log(_id, userData);
      const response = await Api.patch(
        `/user/update-by-admin/${_id}`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// ----------- Delete User
export const deleteUserAction = createAsyncThunk(
  "user/delete-user",
  async (_id, { rejectWithValue }) => {
    try {
      console.log(_id);
      const response = await Api.delete(`/user/delete-by-admin/${_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ---------- Update User Profile
export const updateUserProfileAction = createAsyncThunk(
  "user/update-profile",
  async ({ _id, userData }, { rejectWithValue }) => {
    try {
      const response = await Api.patch(`/user/update-user-profile`, userData, {
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
// ---------- Update User Profile Address
export const updateUserProfileAddressAction = createAsyncThunk(
  "user/update-user-address",
  async ({ _id, userData }, { rejectWithValue }) => {
    try {
      const response = await Api.patch(`/user/update-user-address`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ---------- Admin chats 
export const fetchAdminChatsAction = createAsyncThunk( 
  "user/admin-chats",
  async (data,{ rejectWithValue }) => {
    try {
      console.log(data);
      const response = await Api.get("/messages/chat");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    chats:[],
    user: null,
    users: [],
    getUser: null,
    loading: false,
    error: null,
    success: true,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  ------------------- Current User ----------------
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        // console.log("currentUser",payload);
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = payload.data;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        console.log("currentUser error", payload);
        state.error = payload.error;
        state.success = payload.success;
      })

      //  ------------------- Login User ----------------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = payload.data;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
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

      //  ------------------- Register User ----------------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
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

      //---------------------- Get All users --------------------
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        console.log("all users", payload);
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
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
      // ------------- Create User  ---------------------
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
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
      /* **************** UpdateUser ********************** */
      .addCase(updateUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.getUser = payload.data;
      })
      .addCase(updateUserAction.rejected, (state, { payload }) => {
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

      /* ***************** deleteUser ********************* */
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUserAction.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          if (payload.success === false && payload.error) {
            state.error = payload.error;
            state.success = payload.success;
          } else {
            state.error = "An unknown error occurred";
          }
        } else {
          state.error = "Network error occurred";
        }
      })
      /* ****************** Update Profile ******************** */
      .addCase(updateUserProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.data;
      })
      .addCase(updateUserProfileAction.rejected, (state, { payload }) => {
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
      /* ****************** Update Profile ******************** */
      .addCase(updateUserProfileAddressAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileAddressAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.data;
      })
      .addCase(updateUserProfileAddressAction.rejected, (state, { payload }) => {
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
      /* ****************** fetch Admin Chats******************** */
      .addCase(fetchAdminChatsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminChatsAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.chats = payload.data;
      })
      .addCase(fetchAdminChatsAction.rejected, (state, { payload }) => {
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
export default userSlice.reducer;
