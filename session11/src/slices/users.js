import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  totalData: 0,
  isLoaded: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setInitialData(state, action) {
      state.users = action.payload;
      state.totalData = action.payload.length;
      state.isLoaded = true;
    },
    add(state, action) {
      state.users.push(action.payload);
      state.totalData++;
    },
    update(state, action) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      state.users[index] = action.payload;
    },
  },
});

export const { setInitialData, add, update } = usersSlice.actions;

export default usersSlice.reducer;
