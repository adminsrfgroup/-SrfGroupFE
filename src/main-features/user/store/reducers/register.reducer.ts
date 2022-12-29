import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  registerUser: (state: any) => {
    state.register.loading = true;
    state.register.addSuccess = false;
  },
  registerUserSuccess: (state: any, action: PayloadAction) => {
    state.register.loading = false;
    state.register.addSuccess = true;
  },
  registerUserFailure: (state: any, action: PayloadAction) => {
    state.register.loading = false;
  },

  activationAccount: (state: any) => {
    state.activationAccount.loading = true;
    state.activationAccount.activation = false;
  },
  activationAccountSuccess: (state: any) => {
    state.activationAccount.loading = false;
    state.activationAccount.activation = true;
  },
  activationAccountFailure: (state: any) => {
    state.activationAccount.loading = false;
  },

  resetRegisterUser: (state: any) => {
    state.register.loading = false;
    state.register.addSuccess = false;
  },

  fetchCgu: (state: any) => {
    state.cgu.loading = true;
  },
  fetchCguSuccess: (state: any, action: any) => {
    state.cgu.loading = false;
    state.cgu.entity = action.payload;
  },
  fetchCguFailure: (state: any, action: PayloadAction) => {
    state.cgu.loading = false;
    state.cgu.errorMessage = action.payload;
  },
};

export default reducer;
