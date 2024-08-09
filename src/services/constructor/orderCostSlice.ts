import { createSlice } from "@reduxjs/toolkit";
import { ConstructorItemIgridient, InitialStateOrderCost } from "../../types/types";

const initialState: InitialStateOrderCost = {
  orderCost: 0,
  order: []
}

const orderCostSlice = createSlice({
  name: "orderCost",
  initialState,
  reducers: {
    setCost: (state, { payload }) => {
      state.orderCost = payload.constructorItems.reduce((acc: number, item: ConstructorItemIgridient) => {
        return acc += item.price/*  * item.qty! */
      }, 0) + (payload.bun ? 2 * payload.bun.price : 0)
    },
    setOrder: (state, { payload }) => {
      state.order = payload
    }
  }
})

export const { setCost } = orderCostSlice.actions

export default orderCostSlice.reducer
