import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../core/redux/store';

export interface SignUpState {
  activeStep: number;
  email: string;
  username: string;
  emailFormTouched: boolean;
}

const initialState: SignUpState = {
  activeStep: 0,
  email: '',
  username: '',
  emailFormTouched: false
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    nextStep: state => {
      state.activeStep = (state.activeStep === 2 ? 2 : state.activeStep + 1);
    },
    previousStep: state => {
      state.activeStep = (state.activeStep === 0 ? 0 : state.activeStep - 1);
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setFormTouched: state => {
      state.emailFormTouched = true;
    }
  },
});

export const { nextStep, previousStep, setEmail, setUsername, setFormTouched } = signUpSlice.actions;

export const selectActiveStep = (state: RootState) => state.signUp.activeStep;

export default signUpSlice.reducer;