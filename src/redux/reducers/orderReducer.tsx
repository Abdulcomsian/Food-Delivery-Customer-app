import ActionType from '../types';
import {
  OrdersStatesInterface,
  reducerArgument,
} from '../../constants/interfaces';
const InitialOrderState: OrdersStatesInterface = {
  currentOrder: {},
  ordersPending: [],
  ordersCompleted: [],
  cart: {},
};

export default (
  state = InitialOrderState,
  {type, payload}: reducerArgument,
) => {
  switch (type) {
    case ActionType.USER_LOGOUT: {
      return InitialOrderState;
    }
    case ActionType.UPDATE_CART_ADD: {
      const tCart = {...state.cart};
      if (tCart[payload.id]) {
        tCart[payload.id].qty = tCart[payload.id].qty + 1;
      } else {
        tCart[payload.id] = payload;
        tCart[payload.id].qty = 1;
      }
      return {...state, cart: tCart};
    }
    case ActionType.UPDATE_CART_SUBTRACT: {
      const tCart = {...state.cart};
      if (tCart[payload.id]) {
        if (tCart[payload.id].qty === 1) delete tCart[payload.id];
        else tCart[payload.id].qty = tCart[payload.id].qty - 1;
      }
      return {...state, cart: tCart};
    }
    case ActionType.RESET_CART: {
      return {...state, cart: {}};
    }
    default:
      return state;
  }
};
