// features/myLogin/loginSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userData from '../../data/data.json'; 

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
   
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = userData.user;
        if (email === user.username && password === user.password) {
          resolve({ email });
        } else {
          reject(rejectWithValue('Invalid email or password'));
        }
      }, 1000); 
    });
  }
);

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
      state.status = 'idle'; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetError } = loginSlice.actions;
export default loginSlice.reducer;
