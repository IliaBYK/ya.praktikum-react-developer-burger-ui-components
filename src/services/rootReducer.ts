import { combineReducers } from 'redux';
import ingridientsSlice from "./ingridients/ingridientsSlice";
import constructorItemsSlice from './constructor/constructorItemsSlice';

const rootReducer = combineReducers({
  ingridients: ingridientsSlice,
  constructorItems: constructorItemsSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
