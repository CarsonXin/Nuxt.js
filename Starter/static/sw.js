importScripts('https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/assets/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/assets/3441b40da8bdb9037ba7.js",
    "revision": "f61196e45ff15ad4cb51961161d448cf"
  },
  {
    "url": "https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/assets/6b6be0d3563868981227.js",
    "revision": "3c97d2b888883bcc2d7b026cb4c53a13"
  },
  {
    "url": "https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/assets/a4cba453a995615d7391.js",
    "revision": "b249d2a7c3682e47a41765b8eb385bf0"
  },
  {
    "url": "https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/assets/bb365e8f1e47578ac155.js",
    "revision": "581f1d2867d13365913a7314d7fb378f"
  },
  {
    "url": "https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/assets/bf8b0cd621e0b3d1a6ab.js",
    "revision": "ea0810cf5d2693d4340d4867e6b1bcbe"
  },
  {
    "url": "https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/assets/c252e56b8d6fce3aa24c.js",
    "revision": "fca81661beac4ecffc176c46ce1315d1"
  }
], {
  "cacheId": "starter",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/assets/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
