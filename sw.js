// عامل خدمة بسيط: يحفظ صفحة البداية والأيقونات ليعمل التثبيت ويظهر التطبيق فوراً
const C = 'app-shell-v3';
const FILES = ['./', './index.html', './config.js', './manifest.json', './icon-192.png', './icon-512.png', './logo-full.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;               // روابط Google تمر كما هي
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
