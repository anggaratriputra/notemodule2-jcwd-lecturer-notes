import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItem: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const ids = state.items.map((item) => item.id);
      if (ids.includes(action.payload.id)) {
        return;
      }

      state.items.push(action.payload);
      state.totalItem++;
    },
    removeItem(state, action) {
      const id = action.payload;
      const itemsIdx = state.items.findIndex((item) => item.id === id);

      const deleted = state.items.splice(itemsIdx, 1);
      if (deleted) {
        state.totalItem--;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
