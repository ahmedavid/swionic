// /**
//  * Check out https://googlechrome.github.io/sw-toolbox/ for
//  * more info on how to use sw-toolbox to custom configure your service worker.
//  */
//
//
// 'use strict';
// importScripts('./build/sw-toolbox.js');
//
// self.toolbox.options.cache = {
//   name: 'ionic-cache'
// };
//
// // pre-cache our key assets
// self.toolbox.precache(
//   [
//     './build/main.js',
//     './build/vendor.js',
//     './build/main.css',
//     './build/polyfills.js',
//     'index.html',
//     'manifest.json'
//   ]
// );
//
// // dynamically cache any other local assets
// self.toolbox.router.any('/*', self.toolbox.cacheFirst);
//
// // for any other requests go to the network, cache,
// // and then only use that cached resource if your user goes offline
// self.toolbox.router.default = self.toolbox.networkFirst;
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('trainsCache').then(function(cache) {
      return cache.addAll(
        [
          './build/main.js',
          './build/0.js',
          './build/vendor.js',
          './build/main.css',
          './build/polyfills.js',
          'index.html',
          'manifest.json'
        ]
      );
    })
  );
});



self.addEventListener('fetch', function(event) {
  console.log('INTERCEPTING')
  event.respondWith(
    caches.open('trainsCache').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        console.log('URL:',event.request)
        return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
      });
    })
  );
});
