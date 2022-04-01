import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

export type tabStatus = 'dashboard' | 'mypage' | 'earn' | 'utility';
export interface State {
  tab: tabStatus,
}

const initialState: State = {
  tab: 'dashboard',
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setTabStatus: (state, action: PayloadAction<tabStatus>) => {
      state.tab = action.payload;
    },
  },
});

export const { setTabStatus } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;
export const selectTab = (state: RootState) => state.app.tab;

export default appSlice.reducer;
