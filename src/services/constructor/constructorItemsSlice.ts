import { createSlice } from "@reduxjs/toolkit";
import { InitialStateConstructor } from "../../types/types";

const initialState: InitialStateConstructor = {
  bun: null,
  constructorItems: [],
  constructorItemsRequest: false,
  constructorItemsFailed: false,
};

const constructorSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    clearConstructor(state) {
      state.constructorItems = []
      state.bun = null
    },
    addConstructorItem(state, { payload }) {
      if(payload.type === "bun") {
        state.bun! = {...payload, qty: 2}
      } else {
        const itemIndex = state.constructorItems.findIndex(item => item._id === payload._id)

        if(itemIndex >= 0) state.constructorItems[itemIndex].qty! += 1
        else  state.constructorItems.push({...payload, qty: 1})
      }
    },
    increaseItem(state, { payload }) {
      state.constructorItems.map(item => item._id === payload._id ? item.qty! += 1 : item)
    },
    decreaseItem(state, { payload }) {
      /* if(state.constructorItems.find(item => item._id === payload)?.qty! > 1) { */
        // eslint-disable-next-line array-callback-return
        state.constructorItems.map(item => {
          if(item._id === payload) {
            item.qty! -= 1
            item.qty! === 0 && state.constructorItems.splice(state.constructorItems.indexOf(item), 1)
          }
        })
      //} else state.constructorItems = state.constructorItems.filter(item => item._id !== payload)
    },
    /* deleteItem(state, { payload }) {
      state.constructorItems = state.constructorItems.filter(item => item._id !== payload)
    }, */
  },
});

export const {
  clearConstructor,
  addConstructorItem,
  //increaseItem,
  decreaseItem,
  //deleteItem
} = constructorSlice.actions;

export default constructorSlice.reducer;
