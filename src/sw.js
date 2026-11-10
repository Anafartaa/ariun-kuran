/* Ариун Куран — service worker (çevrimdışı kullanım) */
const VER = 'ak-__VER__';
const CORE = ['./', 'index.html', 'mushaf/fonts/QCF_BSML.woff2', 'app.js?v=__APPV__', 'content.js?v=__APPV__', 'data/quran.json', 'data/meals.json', 'manifest.webmanifest', 'icons/icon-192.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER && k !== 'ak-fonts').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('islamic.network')) return; // ses: her zaman ağdan
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open('ak-fonts').then(c => c.match(req).then(hit => hit || fetch(req).then(r => { c.put(req, r.clone()); return r; }))));
    return;
  }
  if (url.origin !== location.origin) return;
  // aynı köken: önbellekten hemen ver, arkada güncelle
  e.respondWith(caches.open(VER).then(c => c.match(req, { ignoreSearch: req.mode === 'navigate' }).then(hit => {
    if (hit && url.pathname.includes('/mushaf/')) return hit; // mushaf sayfaları/fontları değişmez
    const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  })));
});
