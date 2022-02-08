import { createSlice } from '@reduxjs/toolkit'
import initialState from '../../app/initialState'

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.menu.action = action.payload
      alert(action.payload)
    },
    loadData: (state, action) => {
      state.data.dataArray = state.data.remoteData
      alert(action.payload)
    },
    clearData: (state, action) => {
      state.data.dataArray = []
      alert(action.payload)
    },
  },
})

export const { setAction, loadData, clearData } = menuSlice.actions

// Can be inlined instead of exporting:
// `useSelector((state: RootState) => state.counter.value)`
export const activeTab = (state) => state.root.menu.activeTab

export default menuSlice.reducer
