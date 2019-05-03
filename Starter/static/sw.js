importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/8f866e7bb30358765893.js",
    "revision": "d2727b1644be8a7c82483e29eaa0a8fb"
  },
  {
    "url": "/_nuxt/97a1894b022eac9ce7e3.js",
    "revision": "a4e86a7f05df9d776c9a89c26facd901"
  },
  {
    "url": "/_nuxt/aa4858cd65660d837d9f.js",
    "revision": "e528ea4add6b75fde7d903203822fb5f"
  },
  {
    "url": "/_nuxt/b8a2d0e4c9873e9ac455.js",
    "revision": "a7de6b63e7db86d86786db5ae2b363f0"
  },
  {
    "url": "/_nuxt/e87213927b6e6e186550.js",
    "revision": "04dd25d944f320e69ea3b6006b85dcf4"
  },
  {
    "url": "/_nuxt/f9d270e600d57ee5a5af.js",
    "revision": "55ed0fe02acfb10563d8de3c42d9807f"
  }
], {
  "cacheId": "starter",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
