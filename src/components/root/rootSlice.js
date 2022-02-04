import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menu: {
    activeTab: '/link1',
  },
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.menu.activeTab = action.payload
    },
  },
})

export const { setTab } = menuSlice.actions

// Can be inlined instead of exporting:
// `useSelector((state: RootState) => state.counter.value)`
export const activeTab = (state) => state.root.menu.activeTab

export default menuSlice.reducer
