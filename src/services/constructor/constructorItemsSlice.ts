import { createSlice } from "@reduxjs/toolkit";
import { InitialStateConstructor } from "../../types/types";

const initialState: InitialStateConstructor = {
  constructorItems: [],
  constructorItemsRequest: false,
  constructorItemsFailed: false,
};

const constructorSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    /* setConstructorItems(state, { payload }) {
      state.constructorItems = payload
    }, */
    addConstructorItem(state, { payload }) {
      const itemIndex = state.constructorItems.findIndex(item => item._id === payload._id)

      if(itemIndex >= 0) {
        state.constructorItems[itemIndex].qty! += 1
      } else  state.constructorItems.push({...payload, qty: 1})
    },
    increaseItem(state, { payload }) {
      state.constructorItems.map(item => item._id === payload._id ? item.qty! += 1 : item)
    },
    decreaseItem(state, { payload }) {
      if(state.constructorItems.find(item => item._id === payload)?.qty! > 1) {
        state.constructorItems.map(item => item._id === payload && (item.qty! -= 1))
      } else state.constructorItems = state.constructorItems.filter(item => item._id !== payload)
    },
    /* deleteItem(state, { payload }) {
      state.constructorItems = state.constructorItems.filter(item => item._id !== payload)
    }, */
  },
});

export const {
  // setConstructorItems,
  addConstructorItem,
  //increaseItem,
  decreaseItem,
  //deleteItem
} = constructorSlice.actions;

export default constructorSlice.reducer;
