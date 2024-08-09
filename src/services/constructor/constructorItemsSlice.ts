import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConstructorItemIgridient, Ingridient, InitialStateConstructor } from "../../types/types";
import uniqid from 'uniqid';

const initialState: InitialStateConstructor = {
  bun: null,
  constructorItems: [],
  constructorItemsRequest: false,
  constructorItemsFailed: false,
};

const addUUID = (ingredient: Ingridient):ConstructorItemIgridient => ({...ingredient, uuid:uniqid()})

const constructorSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    clearConstructor(state) {
      state.constructorItems = []
      state.bun = null
    },
    addConstructorItem(state, action: PayloadAction<{
      index: number | undefined,
      start: number | undefined,
      end: number | undefined,
      ingridient: Ingridient
    }>) {
      if(action.payload.ingridient.type === "bun") {
        state.bun! = {...action.payload.ingridient}
      } else {
        if(action.payload.start && action.payload.end) {
          const new_core = state.constructorItems.slice()
          const new_item = addUUID(action.payload.ingridient)
          //const core = new_core.splice(action.payload.start!, 1)
          new_core.splice(action.payload.start!, 0, new_item)
          state.constructorItems = new_core.reverse()
        } else {
          state.constructorItems.push(action.payload.ingridient)
        }
      }
    },
    deleteItem(state, { payload }) {
      const new_core = state.constructorItems.slice()
      new_core.splice(payload, 1)
      state.constructorItems = new_core
    },
  },
});

export const {
  clearConstructor,
  addConstructorItem,
  deleteItem
} = constructorSlice.actions;

export default constructorSlice.reducer;
