import { createSlice } from '@reduxjs/toolkit'
import initialState from '../../app/initialState'

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.menu.action = action.payload
      switch (action.payload) {
        case 'flip':
          state.data.showEnglish = !state.data.showEnglish
        case 'order':
          state.menu.action = action.payload
        case 'random':
          state.menu.action = action.payload
        default:
          state = state
      }
    },
    setGroup: (state, action) => {
      state.menu.group = parseInt(action.payload)
    },
    setSide: (state, action) => {
      state.data.faceUp = action.payload
    },
    loadRemote: (state, action) => {
      state.data.remoteData = action.payload
      state.data.loaded = true
      state.data.dataArray = state.data.remoteData
    },
    loadNew: (state) => {
      state.data.loaded = false
    },
    showPullDown: (state) => {
      state.content.pullDown = true
    },
    hidePullDown: (state) => {
      state.content.pullDown = false
    },
    loadData: (state, action) => {
      state.data.dataArray = action.payload
    },
    clearData: (state, action) => {
      state.data.dataArray = []
    },
  },
})

export const {
  setAction,
  setSide,
  loadData,
  clearData,
  loadRemote,
  setGroup,
  showPullDown,
  hidePullDown,
  loadNew,
} = menuSlice.actions

// Can be inlined instead of exporting:
// `useSelector((state: RootState) => state.counter.value)`
export const currentAction = (state) => state.root.menu.action

export default menuSlice.reducer
