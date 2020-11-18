import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import signUpReducer from '../../features/SignUp/signUpSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signUp: signUpReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
