import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../initial.state';

const reducer = {
    fetchAboutUs: (state: any) => {
        state.aboutus.loading = true;
    },
    fetchAboutUsSuccess: (state: any, action: PayloadAction) => {
        state.aboutus.loading = false;
        state.aboutus.entity = action.payload;
    },
    fetchAboutUsFailure: (state: any, action: PayloadAction) => {
        state.aboutus.loading = false;
    },

    resetAboutUs: (state: any) => {
        state.aboutus = initialState.aboutus;
    },
};

export default reducer;
