import { createSlice } from '@reduxjs/toolkit'
import data from '../../data/mockData.json'

const initialState = {
  menu: {
    action: '',
  },
  content: {
    activeContent: 'landing',
  },
  data: {
    dataArray: [...data],
  },
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.menu.action = action.payload
    },
  },
})

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content.activeContent = action.payload
    },
  },
})

export const { setAction } = menuSlice.actions
export const { setContent } = contentSlice.actions

// Can be inlined instead of exporting:
// `useSelector((state: RootState) => state.counter.value)`
export const activeTab = (state) => state.root.menu.activeTab

export default menuSlice.reducer
