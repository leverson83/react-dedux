import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../components/root/rootSlice'

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
})
