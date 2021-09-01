import ActionTypes from './types';
//=======App Loading Actions
const setLoader = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.FETCHING_LOADING, payload});
};

//======User Actions
const letAuthorizeUser = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.USER_AUTHORIZE, payload});
};
const userLogout = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.USER_LOGOUT});
};
//======App Actions
const toggleBottomFilter = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.TOGGLE_BOTTOM_SHEET});
};
const closeBottomFilter = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.CLOSE_BOTTOM_SHEET});
};
const toggleBottomLogin = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.TOGGLE_LOGIN_BOTTOM_SHEET});
};
const closeBottomLogin = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.CLOSE_LOGIN_BOTTOM_SHEET});
};
//=============Order Actions
const resetCart = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.RESET_CART});
};
const updateCart =
  (payload: object, isAdd = true) =>
  (dispatch: Function) => {
    dispatch({
      type: isAdd
        ? ActionTypes.UPDATE_CART_ADD
        : ActionTypes.UPDATE_CART_SUBTRACT,
      payload,
    });
  };

//=====Exporter
export default {
  setLoader,
  resetCart,
  updateCart,
  letAuthorizeUser,
  userLogout,
  toggleBottomFilter,
  closeBottomFilter,
  toggleBottomLogin,
  closeBottomLogin,
};
