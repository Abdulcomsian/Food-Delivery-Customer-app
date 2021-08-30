import Axios, {AxiosResponse, AxiosError} from 'axios';
import {order, foodCategorie, banner, foodPlace} from '@constants/interfaces';
const baseURL = 'http://localhost:3000/';
const axios = Axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const callBackFun = (title: string, error: object) => {
  console.warn(title, JSON.stringify(error));
  return Promise.reject(error);
};
//requestInterceptor
axios.interceptors.request.use(
  config => {
    if (config.data instanceof FormData) {
      Object.assign(config.headers, config.data.getHeaders());
    }
    console.log(
      config.url + '\n',
      config.data ? JSON.stringify(config.data) : '',
    );
    return config;
  },
  error => callBackFun('RequestError', error),
);
//responseInterceptor
axios.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(
      'RESPONSE: \n',
      response.data ? JSON.stringify(response.data) : '',
    );
    return response;
  },
  error => callBackFun('ResponseError', error),
);
//requestMethods
const signIn = ({email, password}: {password: string; email: string}) => {
  return axios
    .get('/users?email=' + email)
    .then(({data, status}: AxiosResponse) => {
      if (status === 200 && Array.isArray(data) && data.length > 0) {
        const {password: dbPassword} = data[0];
        return dbPassword === password
          ? data[0]
          : {error: 'Password not correct'};
      }
      return {error: 'Email not correct'};
    })
    .catch(() => null);
};
const getNotifications = ({
  uid,
  page = 1,
  limit = 20,
}: {
  uid: number;
  page?: number;
  limit?: number;
}) => {
  return axios
    .get(`/notifications?uid=${uid}&_page=${page}&_limit=${limit}`)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 && Array.isArray(data) && data.length > 0
        ? data
        : [];
    })
    .catch(() => []);
};
const readNotification = ({id}: {id: number}) => {
  return axios
    .patch('/notifications/' + id, {read: true})
    .then(({data, status}: AxiosResponse) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(() => null);
};
const removeNotification = ({id}: {id: number}) => {
  return axios
    .delete('/notifications/' + id)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(() => null);
};
const getOrderList = ({
  uid,
  page = 1,
  limit = 20,
}: {
  uid: number;
  page?: number;
  limit?: number;
}): Promise<Array<order>> => {
  return axios
    .get(`/orders?uid=${uid}&_page=${page}&_limit=${limit}`)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 && Array.isArray(data) && data.length > 0
        ? data
        : [];
    })
    .catch(() => []);
};
const getFoodCategories = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<Array<foodCategorie>> => {
  return axios
    .get(`/featuredFoodCategories?_page=${page}&_limit=${limit}`)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 && Array.isArray(data) && data.length > 0
        ? data
        : [];
    })
    .catch(() => []);
};
const getBanners = (): Promise<Array<banner>> => {
  return axios
    .get(`/todayBanners`)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 && Array.isArray(data) && data.length > 0
        ? data
        : [];
    })
    .catch(() => []);
};
const getFoodPlaces = ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}): Promise<Array<foodPlace>> => {
  return axios
    .get(`/places?_page=${page}&_limit=${limit}`)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 && Array.isArray(data) && data.length > 0
        ? data
        : [];
    })
    .catch(() => []);
};
const getHomePublicData = () => {
  const promise1 = getFoodCategories({});
  const promise2 = getBanners();
  const promise3 = getFoodPlaces({});
  const promise4 = getFoodPlaces({page: 1, limit: 10});
  return Promise.all([promise1, promise2, promise3, promise4])
    .then(RES => {
      if (Array.isArray(RES)) {
        const [featuredFoods, banners, foodPlaces, allFoodPlace] = RES;
        return {featuredFoods, banners, foodPlaces, allFoodPlace};
      } else {
        return null;
      }
    })
    .catch(() => null);
};
export default {
  signIn,
  getNotifications,
  getOrderList,
  readNotification,
  removeNotification,
  getFoodCategories,
  getBanners,
  getFoodPlaces,
  getHomePublicData,
};
