const CACHE_NAME = 'academic-grades-cache-v1';
// قائمة الملفات التي سيتم تخزينها لتعمل أوفلاين
const urlsToCache = [
  './', // الصفحة الرئيسية
  './manifest.json', // ملف التعريف
  // يمكنك إضافة أسماء ملفات CSS أو JS أخرى إذا كانت لديك
  // الملفات الخارجية التي يعتمد عليها تطبيقك
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap',
  'https://cdn.tailwindcss.com/',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
];

// عند تثبيت الـ Service Worker، قم بتخزين الملفات في الذاكرة المؤقتة (Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// عند طلب أي ملف (مثل صورة أو صفحة)، تحقق إذا كان موجودًا في الذاكرة المؤقتة أولاً
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجدناه في الذاكرة، أرجعه مباشرة
        if (response) {
          return response;
        }
        // إذا لم نجده، اطلبه من الإنترنت
        return fetch(event.request);
      }
    )
  );
});