import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCount } from './counterAPI'

const initialState = {
  title: 'Hello',
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount)
    return response.data
  },
)

export const counterSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      //state.title = action.payload
    },
  },
})

export const { setTitle } = counterSlice.actions

//export const selectTitle = (state) => state.title.title

export default counterSlice.reducer
