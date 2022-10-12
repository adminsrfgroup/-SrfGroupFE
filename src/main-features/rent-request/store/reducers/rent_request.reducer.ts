import {PayloadAction} from "@reduxjs/toolkit";
import {initialState} from  '../initial.state';

const reducer = {
    addRentRequests: (state: any) => {
        state.rentRequest.loading = true;
        state.rentRequest.addSuccess = false;
    },
    addRentRequestsSuccess: (state: any, action: any) => {
        state.rentRequest.loading = false;
        state.rentRequest.entity = action.payload;
        state.rentRequest.addSuccess = true;
    },
    addRentRequestsFailure: (state: any, action: PayloadAction) => {
        state.rentRequest.loading = false;
    },


    fetchRentRequestsSent: (state: any) => {
        state.rentRequest.loadingEntitiesSent = true;
    },
    fetchRentRequestsSuccessSent: (state: any, action: any) => {
        state.rentRequest.loadingEntitiesSent = false;
        state.rentRequest.entitiesSent = [
            ...state.rentRequest.entitiesSent,
            ...action.payload.content
        ];
        state.rentRequest.totalItemsSent = action.payload?.totalElements;
        state.rentRequest.totalPagesSent = action.payload?.totalPages;
    },
    fetchRentRequestsFailureSent: (state: any, action: PayloadAction) => {
        state.rentRequest.loadingEntitiesSent = false;
    },


    fetchRentRequestsReceived: (state: any) => {
        state.rentRequest.loadingEntitiesReceived = true;
    },
    fetchRentRequestsSuccessReceived: (state: any, action: any) => {
        state.rentRequest.loadingEntitiesReceived = false;
        state.rentRequest.entitiesReceived = [
            ...state.rentRequest.entitiesReceived,
            ...action.payload.content
        ];
        state.rentRequest.totalItemsReceived = action.payload?.totalElements;
        state.rentRequest.totalPagesReceived = action.payload?.totalPages;
    },
    fetchRentRequestsFailureReceived: (state: any, action: PayloadAction) => {
        state.rentRequest.loadingEntitiesReceived = false;
    },

    setActivePageSentRentRequest: (state: any, action: PayloadAction) => {
        console.log('action ==== ', action);
        state.rentRequest.activePageSent = action.payload;
    },

    resetRentRequestsSent: (state: any) => {
        state.rentRequest.loadingEntitiesSent = initialState.rentRequest.loadingEntitiesSent;
        state.rentRequest.entitiesSent = initialState.rentRequest.entitiesSent;
        state.rentRequest.totalItemsSent = initialState.rentRequest.totalItemsSent;
        state.rentRequest.totalPagesSent = initialState.rentRequest.totalPagesSent;
        state.rentRequest.activePageSent = initialState.rentRequest.activePageSent;
    },
    resetRentRequestsReceived: (state: any) => {
        state.rentRequest.loadingEntitiesReceived = initialState.rentRequest.loadingEntitiesReceived;
        state.rentRequest.entitiesReceived = initialState.rentRequest.entitiesReceived;
        state.rentRequest.totalItemsReceived = initialState.rentRequest.totalItemsReceived;
        state.rentRequest.totalPagesReceived = initialState.rentRequest.totalPagesReceived;
    },
}


export default reducer;
