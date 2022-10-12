import {createSlice, Slice} from "@reduxjs/toolkit";
import {initialState} from './initial.state';
import rentRequestReducer from "./reducers/rent_request.reducer";

export const RENT_REQUEST_KEY_IN_STORE = "rentRequest";

export const rentRequestSlice: Slice = createSlice({
    name: RENT_REQUEST_KEY_IN_STORE,
    initialState: initialState,
    reducers: {
        ...rentRequestReducer,
    },
});


export const {

    //? ********************| ADD RENTREQUEST ACTIONS |*******************/
    addRentRequests,
    addRentRequestsSuccess,
    addRentRequestsFailure,


    //? ********************| FETCH RENTREQUEST SENT USERS ACTIONS |*******************/
    fetchRentRequestsSent,
    fetchRentRequestsSuccessSent,
    fetchRentRequestsFailureSent,


    //? ********************| FETCH RENTREQUEST RECEIVED USERS ACTIONS |*******************/
    fetchRentRequestsReceived,
    fetchRentRequestsSuccessReceived,
    fetchRentRequestsFailureReceived,

    resetRentRequests

} = rentRequestSlice.actions;

//? ********************| RENTREQUEST SELECTORS |*******************/
export const loadingRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.loading;
export const entityRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.entity;
export const loadingEntitiesSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.loadingEntitiesSent;
export const entitiesSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.entitiesSent;
export const totalItemsSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.totalItemsSent;
export const totalPagesSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.totalPagesSent;
export const loadingEntitiesReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.loadingEntitiesReceived;
export const entitiesReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.entitiesReceived;
export const totalItemsReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.totalItemsReceived;
export const addSuccessRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.addSuccess;
export const deleteSuccessRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.deleteSuccess;