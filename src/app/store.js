import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../app/slice/userSlice";
import feedReducer from "../app/slice/feedSlice";
export const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    feed: feedReducer,
  },
});
