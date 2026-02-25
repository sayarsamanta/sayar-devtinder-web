import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
  requests: [], // List of incoming connection requests
  connections: [], // List of accepted connections
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setConnections: (state, action) => {
      state.connections = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (req) => req._id.toString() !== action.payload.toString()
      );
    },
    removeConnection: (state, action) => {
      state.connections = state.connections.filter(
        (conn) => conn._id.toString() !== action.payload.toString()
      );
    },
  },
});

export const {
  setUser,
  setToken,
  logout,
  setRequests,
  setConnections,
  removeRequest,
  removeConnection,
} = userSlice.actions;
export default userSlice.reducer;
