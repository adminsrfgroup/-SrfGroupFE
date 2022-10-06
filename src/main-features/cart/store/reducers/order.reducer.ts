import { initialState } from "../initial.state";

const reducer = {
    addCart: (state: any) => {
        state.order.loading = true;
        state.order.addSuccess = false;
    },
    addCartSuccess: (state: any, action: any) => {
        state.order.loading = false;
        state.order.addSuccess = true;
        state.order.entity = action.payload;
    },
    addCartFailure: (state: any) => {
        state.order.loading = false;
    },

    resetCart: (state: any) => {
        return {
            ...state,
            ...initialState.order,
        };
    },
};

export default reducer;
