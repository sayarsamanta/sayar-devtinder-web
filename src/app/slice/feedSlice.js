import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  feed: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
    removeFromFeed: (state, action) => {
      state.feed = state.feed.filter((user) => user._id !== action.payload);
    },
  },
});

export const { setFeed, removeFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
