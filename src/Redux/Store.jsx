import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import serviceSlice from "./Slice/serviceSlice";
import blogSlice from "./slice/blogSlice";
import papersSlice from "./Slice/papersSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    blog: blogSlice,
    service:serviceSlice,
    papers:papersSlice
  },
});
export default store;
