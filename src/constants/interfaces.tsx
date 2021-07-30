export interface reducerArgument {
  type: string;
  payload: any;
}
export interface InitialUserInterface {
  loggedIn: boolean;
  online: boolean;
  detail: object;
}

export interface OrdersStatesInterface {
  currentOrder: object | null;
  cart: object;
  ordersPending: Array<object>;
  ordersCompleted: Array<object>;
}
export interface AppStatesInterface {
  authLoading: boolean;
  fetchingLoading: boolean;
  filterBottomSheet: boolean;
  loginBottomSheet: boolean;
}
