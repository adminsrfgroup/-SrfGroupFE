const reducer = {
  showModal: (state: any) => {
    state.unauthorized.showUnauthorized = true;
  },
  hideModal: (state: any) => {
    state.unauthorized.showUnauthorized = false;
  },
};
export default reducer;
