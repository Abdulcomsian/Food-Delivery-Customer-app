import ActionType from '../types';
import {
  InitialUserInterface,
  reducerArgument,
} from '../../constants/interfaces';
const InitialUserState: InitialUserInterface = {
  loggedIn: false,
  online: false,
  detail: {},
};

export default (state = InitialUserState, {type, payload}: reducerArgument) => {
  switch (type) {
    case ActionType.USER_AUTHORIZE: {
      return {
        ...state,
        loggedIn: true,
        detail: payload,
      };
    }
    case ActionType.USER_LOGOUT: {
      return InitialUserState;
    }
    default:
      return state;
  }
};
