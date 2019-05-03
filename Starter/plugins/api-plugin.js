import {projectTokenName} from '../utils/properties';
import {authLogin, getParams} from '../utils/utils';

export default ({$axios}) => {
  $axios.onRequest(config => {
    let urlToken = localStorage.getItem(projectTokenName) || getParams('token');
    if (urlToken !== '' || urlToken !== undefined) {
      config.headers.common['X-token'] = urlToken;
    }
    return config;
  });

  $axios.onRequestError(error => {
    return Promise.reject(error);
  });

  $axios.onResponse(res => {
    const code = Number(res.data.code);
    if (code > 199 && code < 300) {
      authLogin();
    } else {
      return res;
    }
  });

  $axios.onResponseError(error => {
    return Promise.reject(error);
  });

  $axios.onError(error => Promise.reject(error));
};
