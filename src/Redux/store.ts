import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './profileSlice'
import adsReducer from './adsSlice'

const store = configureStore({
  reducer: {
    profile: profileReducer,
    ads: adsReducer
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
