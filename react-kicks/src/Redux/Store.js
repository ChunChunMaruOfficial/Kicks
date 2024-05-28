import { configureStore } from '@reduxjs/toolkit'
import kicksReducer from './Slice/kicksSlice'
import variableReducer from './Slice/variableSlice'

export default configureStore({
  reducer: { kicksReducer, variableReducer },
});