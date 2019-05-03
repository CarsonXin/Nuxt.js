import axios from 'axios';

import {baseURL, projectTokenName} from './properties';
import {authLogin, getParams} from './utils';

export const api = axios.create({
  baseURL,
});

export const apiCancelToken = api.CancelToken;

api.interceptors.request.use(config => {
  let urlToken = localStorage.getItem(projectTokenName) || getParams('token');
  if (urlToken !== '' || urlToken !== undefined) {
    config.headers.common['X-token'] = urlToken;
  }
  return config;
}, error => Promise.reject(error));
api.interceptors.response.use((res) => {
  const code = Number(res.data.code);
  if (code > 199 && code < 300) {
    authLogin();
  } else {
    return res;
  }
}, error => {
  return Promise.reject(error);
});


export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, 'api', {value: api});
  },
};