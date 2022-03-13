import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPrivateLessons } from '../Firebase/Firebase';
import { PrivateLesson } from '../Models/PrivateLesson'
import { RootState } from './store'

export const fetchAllData = createAsyncThunk(
  'privateLessons/fetchPrivateLessons',
  async () => {
    const result = await getPrivateLessons();
    return result;
  }
);

// Define the initial state using that type
const initialState: PrivateLesson[] = []

export const counterSlice = createSlice({
  name: 'privateLessons',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addPrivateLesson: (state, action: PayloadAction<PrivateLesson>) => {
      return [...state, action.payload];
    },
    addPrivateLessons: (state, action: PayloadAction<PrivateLesson[]>) => {
      return [...state, ...action.payload];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllData.pending, (state, action) => {
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        return [...action.payload];
    })
  }
})

export const { addPrivateLesson } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default counterSlice.reducer