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
        state.rentRequest.entitiesSent = action.payload?.content;
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
        state.rentRequest.entitiesReceived = action.payload?.content;
        state.rentRequest.totalItemsReceived = action.payload?.totalElements;
        state.rentRequest.totalPagesReceived = action.payload?.totalPages;
    },
    fetchRentRequestsFailureReceived: (state: any, action: PayloadAction) => {
        state.rentRequest.loadingEntitiesReceived = false;
    },

    resetRentRequests: (state: any) => {
        state.rentRequest = initialState.rentRequest;
    },
}


export default reducer;
