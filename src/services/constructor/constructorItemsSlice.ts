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
        !action.payload.start && state.constructorItems.push(action.payload.ingridient)
      }
    },
    setConstructorItem(state, action: PayloadAction<{
      index: number | undefined,
      start: number | undefined,
      end: number | undefined,
      ingridient: Ingridient
    }>) {
      const new_core = state.constructorItems.slice()
      const new_ingridient_start = new_core.splice(action.payload.start!, 1)[0]
      const new_ingridient_end = new_core.splice(action.payload.end!, 1)[0]
      new_core.splice(action.payload.start!, 1)
      new_core.splice(action.payload.end!, 1)
      new_core.splice(action.payload.end!, 0, new_ingridient_start)
      new_core.splice(action.payload.start!, 0, new_ingridient_end)
      state.constructorItems = new_core
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
  setConstructorItem,
  deleteItem
} = constructorSlice.actions;

export default constructorSlice.reducer;
