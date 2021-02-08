/* eslint-disable no-restricted-globals */
// Set this to true for production
const doCache = true;

// Name our cache
const CACHE_NAME = 'my-pwa-cache-v1';

// Delete old caches that are not our current one!
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(caches.keys()
    .then((cacheNames) => Promise.all(
      cacheNames.filter((name) => !cacheWhitelist.includes(name))
        .map((cacheName) => caches.delete(cacheName)),
    )));
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
        '/',
        '/manifest.json',
        '/index.html',
        '/LastFmReactTitle.png',
        '/LastFmReactTitle_52.png',
        '/YdBO.gif',
        '/favicon.ico',
      ])),
  );

  // // Get the assets manifest so we can see what our js file is named
  // // This is because webpack hashes it
  fetch('asset-manifest.json')
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((assets) => {
      // Open a cache and cache our files
      // We want to cache the page and the main.js generated by webpack
      // We could also cache any static assets like CSS or images
      console.log(assets);
      const urlsToCache = [
        '/',
        assets['main.js'],
      ];

      const assetList = Object.values(assets.files);
      console.log(assetList);

      console.log(urlsToCache);
      caches.open(CACHE_NAME).then((cache) => {
        cache.addAll(assetList);
      });
    });
});

// When the webpage goes to fetch files,
// we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', (event) => {
  console.log('fetching');
  console.log(event.request.url);
  const { url } = event.request;
  if (url.includes('getrecenttracks')
      || url.includes('getTopArtists')
      || url.includes('getTopAlbums')
      || url.includes('getTopTracks')
  ) {
    console.log('audioscrollber request');
    return fetch(event.request).then(
      (res) => res,
      (err) => {
        console.log('erro');
        throw Error('uh oh');
      },
    ).catch((e) => {
      console.log(e);
    });
  }
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => cache.match(event.request)
      .then((response) => response || fetch(event.request)
        .then((res) => {
          cache.put(event.request, res.clone());
          return res;
        }))),
  );
});
