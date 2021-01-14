self.addEventListener('install', evt=>{
    console.log(evt);
});

self.addEventListener('activate', evt => {
    console.log(evt);
});
self.addEventListener('fetch', evt => {
    if(!navigator.onLine){
        evt.respondWith(New Response('Pas de connexion pour ce site'));
    }
});
