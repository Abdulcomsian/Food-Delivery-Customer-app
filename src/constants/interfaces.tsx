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

export interface order {
  id: number;
  uid: number;
  orderNumber: string;
  Address: string;
  reviewStars: number;
  ratings: number;
  foodProvider: string;
  Avatar: string;
  created_at: string;
  items: Array<Item>;
  deliveryCharges: number;
  foodProviderAddress: string;
}

export interface Item {
  name: string;
  qty: number;
  price: number;
}
