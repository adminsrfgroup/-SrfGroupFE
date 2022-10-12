export const initialState = {
    rentRequest: {
        loading: false,
        entity: {},
        loadingEntitiesSent: false,
        entitiesSent: [],
        totalItemsSent: -1,
        totalPagesSent: 0,
        loadingEntitiesReceived: false,
        entitiesReceived: [],
        totalItemsReceived: -1,
        totalPagesReceived: 0,
        addSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
        errorMessage: null,
    },
};