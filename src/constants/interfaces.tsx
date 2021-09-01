export interface reducerArgument {
  type: string;
  payload: any;
}
export interface InitialUserInterface {
  loggedIn: boolean;
  online: boolean;
  detail: object;
}
export interface userModel {
  id?: number;
  fId: string;
  name: string;
  email: string;
  DoB: string;
  phone: string;
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
export interface foodCategorie {
  image: string;
  name: string;
  id: number;
  cid: number;
}
export interface banner {
  heading: string;
  subHeading: string;
  type: string;
  url: string;
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
export interface foodPlace {
  id: number;
  avatar: string;
  reviewStars: number;
  ratings: number;
  foodProvider: string;
  foodProviderAddress: string;
  deliveryCharges: number;
  discount: number;
  created_at: string;
  timing: string;
}
export interface Item {
  name: string;
  qty: number;
  price: number;
}
export interface menus {
  rid: number;
  id: number;
  cat: string;
  items: foodItem[];
}

export interface foodItem {
  name: string;
  price: number;
  image: string;
  id: number;
}
