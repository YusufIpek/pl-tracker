import { configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import { getPrivateLessons } from '../Firebase/Firebase';
import { PrivateLesson } from '../Models/PrivateLesson';
import { useAppDispatch } from './hooks';
import reducer from './slicer';

export const store = configureStore({
  reducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
