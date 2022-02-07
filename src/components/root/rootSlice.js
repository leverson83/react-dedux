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
    dataArray: [],
  },
}

const loader = () => {
  return [...data]
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.menu.action = action.payload
      if (action.payload === 'load') {
        state.data.dataArray = loader()
      } else {
        alert(action.payload)
      }
    },
  },
})

export const { setAction } = menuSlice.actions

// Can be inlined instead of exporting:
// `useSelector((state: RootState) => state.counter.value)`
export const activeTab = (state) => state.root.menu.activeTab

export default menuSlice.reducer
