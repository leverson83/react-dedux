import { createSlice } from '@reduxjs/toolkit'
import initialState from '../../app/initialState'

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setAction: (state, action) => {
      //alert(action.payload)
      state.menu.action = action.payload
    },
    loadRemote: (state, action) => {
      state.data.remoteData = action.payload
      state.data.loaded = true
      state.data.dataArray = state.data.remoteData
    },
    loadData: (state, action) => {
      //alert(action.payload)
      state.menu.action = 'load'
      state.data.dataArray = state.data.remoteData
      state.data.loaded = true
    },
    clearData: (state, action) => {
      //alert(action.payload)
      state.data.dataArray = []
    },
  },
})

export const { setAction, loadData, clearData, loadRemote } = menuSlice.actions

// Can be inlined instead of exporting:
// `useSelector((state: RootState) => state.counter.value)`
export const currentAction = (state) => state.root.menu.action

export default menuSlice.reducer
