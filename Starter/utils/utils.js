import {baseURL} from './properties';

function authLogin() {
  let location = window.location;
  let url = encodeURI(location.origin + location.pathname);
  window.location.href = `${baseURL}/index/authLogin?callback=${url}`;
}

function getParams(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let param = window.location.search.substr(1).match(reg);
  if (param !== null) {
    return decodeURI(param[2]);
  }
}

function setCookie(name, value, expiresDay = 7) {
  let d = new Date();
  d.setTime(d.getTime() + (expiresDay * 24 * 60 * 60 * 1000));
  let expires = 'expires=' + d.toGMTString();
  document.cookie = name + '=' + value + '; ' + expires;
  // console.warn(document.cookie, name, value, expiresDay)
}

function getCookie(name) {
  let $name = name + '=';
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf($name) === 0) {
      return cookie.substring($name.length, cookie.length);
    }
  }
  return '';
}

export {
  getParams,
  getCookie,
  setCookie,
  authLogin,
};
