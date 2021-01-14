self.addEventListener('install', evt=>{
    console.log(evt);
});

self.addEventListener('activate', evt => {
    console.log(evt);
});
self.addEventListener('fetch', evt=>{
    console.log(evt.request.url);
    console.log(navigator.onLine ? 'online' : 'offline')
    if (!navigator.onLine){
        evt.respondWith( new Response('pas de connexion internet'))
    }
    console.log(evt.request.url);
});
