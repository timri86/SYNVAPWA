self.addEventListener('install', evt=>{
    caches.open('lpdwca-PWA').then(
                cache=>{
                    cache.addAll([
                        'index.html',
                        'sw.js',
                        ]);
             })

});

self.addEventListener('activate', evt => {
    console.log(evt);
});
self.addEventListener('fetch', evt=>{
    if (!(evt.request.url.indexOf('http') === 0)) return; 
    evt.respondWith(
        caches.match(evt.request).then(rep=>{
            if(rep){
                //si la page existe on la retourne
                return rep;
            }
            /*si la page n'existe pas, on utilise la méthode network    fallback pour ouvrir l'instance de cache et enregistrer la page dans le cache pour les futurs requêtes
            */
            return fetch(evt.request).then(
                newResponse=>{
                    caches.open('lpdwca-PWA').then(
                        cache=>cache.put(evt.request, newResponse
                        ));
                        /*puisque une réponse ne peut être utilisé 2 fois, si on a besoin de l'utiliser une seconde fois, on doit le cloner
                        */
                        return newResponse.clone();
                })
        })
    )

})
self.addEventListener('push', function(e) {
    var options = {
        body: 'This notification was generated from a push!',
        icon: 'icon/android-icon-192x192-dunplab-manifest-28617.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {action: 'explore', title: 'Explore this new world'},
            {action: 'close', title: 'Close'}
        ]
    };
    e.waitUntil(
        self.registration.showNotification('Hello world!', options)
    );
});
