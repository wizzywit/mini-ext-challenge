import authReducer, {
    AuthState,
    login,
    logout,
} from './authSlice';

describe('auth reducer', () => {
    const initialState: AuthState = {
        auth: false,
    };
    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            auth: false,
        });
    });

    it('should handle login', () => {
        const actual = authReducer(initialState, login());
        expect(actual.auth).toEqual(true);
    });

    it('should handle logout', () => {
        const actual = authReducer(initialState, logout());
        expect(actual.auth).toEqual(false);
    });
});
