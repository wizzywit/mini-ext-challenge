import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
    auth: boolean;
}

const initialState: AuthState = {
    auth: false,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        login: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.auth = true;
        },
        logout: (state) => {
            state.auth = false;
        },
    },

});

export const { login, logout } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state: RootState) => state.auth.auth;



export default authSlice.reducer;
