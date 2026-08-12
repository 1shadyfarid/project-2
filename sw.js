const CACHE_NAME = "community-feki-v2";

const APP_FILES = [
    "./",
    "./community.html",
    "./manifest.json"
];


/* =====================================================
   INSTALL
===================================================== */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        APP_FILES
                    );

                })

        );

        self.skipWaiting();

    }
);


/* =====================================================
   ACTIVATE
===================================================== */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(keys => {

                    return Promise.all(

                        keys
                            .filter(
                                key =>
                                    key !== CACHE_NAME
                            )
                            .map(
                                key =>
                                    caches.delete(key)
                            )

                    );

                })

        );

        self.clients.claim();

    }
);


/* =====================================================
   FETCH
===================================================== */

self.addEventListener(
    "fetch",
    event => {

        /*
           Always try the newest version from
           the network first.

           Only use cache if the network fails.
        */

        event.respondWith(

            fetch(event.request)
                .then(response => {

                    return response;

                })
                .catch(() => {

                    return caches.match(
                        event.request
                    );

                })

        );

    }
);