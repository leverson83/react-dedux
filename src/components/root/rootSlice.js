import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menu: {
    activeTab: '/link1',
  },
}

export const counterSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.menu.activeTab = action.payload
    },
  },
})

export const { setTab } = counterSlice.actions

export const activeTab = (state) => state.root.menu.activeTab

export default counterSlice.reducer
