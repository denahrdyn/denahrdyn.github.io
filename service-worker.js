importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox)
    console.log(`Yay! Workbox is loaded 🎉`);
else 
    console.log(`Boo! Workbox didn't load 😬`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/content.html', revision: '1' },
    { url: '/detail.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/package-lock.json', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/favorite.html', revision: '1' },
    { url: '/js/sw-register.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' }, 
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/favicon-32x32.png', revision: '1' },
    { url: '/icon-192.png', revision: '1' },
    { url: '/icon-512.png', revision: '1' },
    { url: '/assets/leagues/Bundesliga.png', revision: '1' },
    { url: '/assets/leagues/Italy_Serie_A.png', revision: '1' },
    { url: '/assets/leagues/La_Liga.png', revision: '1' },
    { url: '/assets/leagues/Ligue1.png', revision: '1' },
    { url: '/assets/leagues/Premier_League.png', revision: '1' },
    { url: '/assets/leagues/UEFA_Champions_League.png', revision: '1' },
    { url: '/assets/logo/Logo.png', revision: '1' },
    { url: '/assets/logo/icon-72.png', revision: '1' },
    { url: '/assets/blank.png', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
    { url: 'https://code.jquery.com/jquery-3.3.1.min.js', revision: '1' },
    { url: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets', 
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com\//,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.networkFirst({
        cacheName: 'api-football',
    })
);


self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'assets/logo/icon-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});