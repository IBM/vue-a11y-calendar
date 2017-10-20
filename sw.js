importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/vue-a11y-calendar/_nuxt/app.e639ab801a5a2f06f0c6.js",
    "revision": "e1adf050f2a47bba66bf3252d0131e58"
  },
  {
    "url": "/vue-a11y-calendar/_nuxt/common.4cab845d36892e4634f3.js",
    "revision": "cc2c9b404a241dbd76c2e8375eb393ce"
  },
  {
    "url": "/vue-a11y-calendar/_nuxt/layouts/default.5bd8443273e5bad16003.js",
    "revision": "3875eb2af89a806ef12bd26ba250b713"
  },
  {
    "url": "/vue-a11y-calendar/_nuxt/manifest.11520c30218689d39195.js",
    "revision": "a4ee3c60b40b7eaabf6c2c8ed0feee09"
  },
  {
    "url": "/vue-a11y-calendar/_nuxt/pages/components/_component.c55d86f8aea0b2ba9317.js",
    "revision": "58ea2547114228885206df9af715bbb7"
  },
  {
    "url": "/vue-a11y-calendar/_nuxt/pages/index.262ca893493f6579bb27.js",
    "revision": "85692508a39a44317da4f578ded2ebc9"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "vue-a11y-calendar_0.1.3",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/vue-a11y-calendar/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/vue-a11y-calendar/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
