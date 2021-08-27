import ActionType from '../types';
import {reducerArgument, AppStatesInterface} from '@constants/interfaces';
const InitialAppState: AppStatesInterface = {
  authLoading: false,
  fetchingLoading: false,
  filterBottomSheet: false,
  loginBottomSheet: false,
};

export default (state = InitialAppState, {type, payload}: reducerArgument) => {
  switch (type) {
    case ActionType.FETCHING_LOADING: {
      return {
        ...state,
        fetchingLoading: payload,
      };
    }
    case ActionType.USER_LOGOUT: {
      return InitialAppState;
    }
    case ActionType.TOGGLE_BOTTOM_SHEET: {
      return {
        ...state,
        filterBottomSheet: !state.filterBottomSheet,
      };
    }
    case ActionType.CLOSE_BOTTOM_SHEET: {
      return {
        ...state,
        filterBottomSheet: false,
      };
    }
    case ActionType.TOGGLE_LOGIN_BOTTOM_SHEET: {
      return {
        ...state,
        loginBottomSheet: !state.loginBottomSheet,
      };
    }
    case ActionType.CLOSE_LOGIN_BOTTOM_SHEET: {
      return {
        ...state,
        loginBottomSheet: false,
      };
    }
    default:
      return state;
  }
};
