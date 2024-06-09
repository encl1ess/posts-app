import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../../posts/model/postsReducer'
import commentsReducer from '../../comments/model/commentsReducer'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch