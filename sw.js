const CACHE_NAME = "community-feki-v1";

const APP_FILES = [
    "./",
    "./community.html",
    "./manifest.json"
];


/* =====================================================
   INSTALL
===================================================== */

self.addEventListener("install", event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(APP_FILES);

            })

    );

    self.skipWaiting();

});


/* =====================================================
   ACTIVATE
===================================================== */

self.addEventListener("activate", event => {

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

});


/* =====================================================
   FETCH / OFFLINE CACHE
===================================================== */

self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)

            .catch(() =>
                caches.match(
                    event.request
                )
            )

    );

});


/* =====================================================
   PUSH NOTIFICATION
===================================================== */

self.addEventListener("push", event => {

    let data = {};

    try {

        data =
            event.data
                ? event.data.json()
                : {};

    }

    catch (error) {

        console.error(
            "Push notification data error:",
            error
        );

        data = {
            title: "مجتمع الفقي",
            body: "لديك إشعار جديد."
        };

    }


    const title =
        data.title ||
        "مجتمع الفقي";


    const body =
        data.body ||
        "لديك إشعار جديد.";


    const icon =
        data.icon ||
        "/logo.png";


    const badge =
        data.badge ||
        "/logo.png";


    const postId =
        data.post_id ||
        null;


    const notificationOptions = {

        body: body,

        icon: icon,

        badge: badge,

        dir: "rtl",

        lang: "ar",

        data: {

            post_id: postId,

            url:
                data.url ||
                "./community.html"

        }

    };


    event.waitUntil(

        self.registration.showNotification(
            title,
            notificationOptions
        )

    );

});


/* =====================================================
   NOTIFICATION CLICK
===================================================== */

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();


        const notificationData =
            event.notification.data ||
            {};


        const url =
            notificationData.url ||
            "./community.html";


        event.waitUntil(

            clients
                .matchAll({

                    type: "window",

                    includeUncontrolled: true

                })

                .then(
                    windowClients => {

                        /*
                         * If Community is already open,
                         * focus it instead of opening
                         * another window.
                         */

                        for (
                            const client
                            of windowClients
                        ) {

                            if (
                                "focus" in client
                            ) {

                                return client
                                    .focus();

                            }

                        }


                        /*
                         * Otherwise open
                         * the Community page.
                         */

                        if (
                            clients.openWindow
                        ) {

                            return clients.openWindow(
                                url
                            );

                        }

                    }

                )

        );

    }
);