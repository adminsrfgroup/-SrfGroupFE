import { initialState } from '../initial.state';
import { PayloadAction } from '@reduxjs/toolkit';

const reducer = {
    addOrder: (state: any) => {
        state.order.loading = true;
        state.order.addSuccess = false;
    },
    addOrderSuccess: (state: any, action: any) => {
        state.order.loading = false;
        state.order.addSuccess = true;
        state.order.entity = action.payload;
    },
    addOrderFailure: (state: any) => {
        state.order.loading = false;
    },

    fetchPassedOrder: (state: any) => {
        state.order.loadingEntities = true;
    },
    fetchPassedOrderSuccess: (state: any, action: any) => {
        state.order.loadingEntities = false;
        state.order.entities = [...state.order.entities, ...action.payload.content];
        state.order.totalItems = action.payload?.totalElements;
        state.order.totalPages = action.payload?.totalPages;
    },
    fetchPassedOrderFailure: (state: any, action: PayloadAction) => {
        state.order.loadingEntities = false;
    },

    fetchReceivedOrder: (state: any) => {
        state.orderReceived.loadingEntities = true;
    },
    fetchReceivedOrderSuccess: (state: any, action: any) => {
        state.orderReceived.loadingEntities = false;
        state.orderReceived.entities = [...state.orderReceived.entities, ...action.payload.content];
        state.orderReceived.totalItems = action.payload?.totalElements;
        state.orderReceived.totalPages = action.payload?.totalPages;
    },
    fetchReceivedOrderFailure: (state: any, action: PayloadAction) => {
        state.orderReceived.loadingEntities = false;
    },

    setActivePageOrder: (state: any, action: PayloadAction) => {
        state.order.activePage = action.payload;
    },
    setActivePageReceivedOrder: (state: any, action: PayloadAction) => {
        state.orderReceived.activePage = action.payload;
    },

    resetReceivedOrder: (state: any) => {
        state.orderReceived = initialState.orderReceived;
    },
    resetPassedOrder: (state: any) => {
        state.order = initialState.order;
    },
    resetOrder: (state: any) => {
        state.order = initialState.order;
        state.orderReceived = initialState.orderReceived;
    },
};

export default reducer;
