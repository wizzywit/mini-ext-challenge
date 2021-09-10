import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import airtableReducer from '../features/airtable/airtableSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    airtable: airtableReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
