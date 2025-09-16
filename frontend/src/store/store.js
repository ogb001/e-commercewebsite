import { configureStore } from '@reduxjs/toolkit'
// import userReducer from '../redux/userSlice';
import userReducer from './userSlice';


export const store = configureStore({
  reducer: {
    user : userReducer
  },
})

// import userReducer from '../redux/userSlice';