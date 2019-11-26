/* eslint-disable no-undef */
importScripts(
  "https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js"
);
workbox.setConfig({
  modulePathPrefix: "https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/"
});

if (workbox) {
  console.log(`Yay! Workbox is loaded ??`);
} else {
  console.log(`Boo! Workbox didn't load ??`);
}

workbox.setConfig({
  debug: false
});

let cacheSuffixVersion = "-191120";
const maxEntries = 100;

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(/\/api/ig, new workbox.strategies.NetworkOnly());
workbox.routing.registerRoute(/run/ig, new workbox.strategies.NetworkOnly());
workbox.routing.registerRoute(/\/api/ig, new workbox.strategies.NetworkOnly(), 'POST');
workbox.routing.registerRoute(/run/ig, new workbox.strategies.NetworkOnly(), 'POST');
workbox.routing.registerRoute(/\/api/ig, new workbox.strategies.NetworkOnly(), 'PUT');
workbox.routing.registerRoute(/run/ig, new workbox.strategies.NetworkOnly(), 'PUT');
workbox.routing.registerRoute(/\/api/ig, new workbox.strategies.NetworkOnly(), 'DELETE');
workbox.routing.registerRoute(/run/ig, new workbox.strategies.NetworkOnly(), 'DELETE');

workbox.routing.registerRoute(
  // Cache Image File
  /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "img-cache" + cacheSuffixVersion,
    plugins: [
      // ʹ�� expiration ���ʵ�ֻ�����Ŀ��Ŀ��ʱ�����
      new workbox.expiration.Plugin({
        // ��󱣴���Ŀ
        maxEntries,
        // ���� 30 ��
        maxAgeSeconds: 30 * 24 * 60 * 60
      }),
      // ʹ�� cacheableResponse �������״̬��Ϊ 0 ������
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  // Cache CSS & JS files
  /.*\.(css|js)/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-assets-cache",
    plugins: [
      // ʹ�� expiration ���ʵ�ֻ�����Ŀ��Ŀ��ʱ�����
      new workbox.expiration.Plugin({
        // ��󱣴���Ŀ
        maxEntries,
        // ���� 30 ��
        maxAgeSeconds: 30 * 24 * 60 * 60
      }),
      // ʹ�� cacheableResponse �������״̬��Ϊ 0 ������
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  // Cache Fonts files
  /.*\.(woff|woff2)/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-assets-cache",
    plugins: [
      // ʹ�� expiration ���ʵ�ֻ�����Ŀ��Ŀ��ʱ�����
      new workbox.expiration.Plugin({
        // ��󱣴���Ŀ
        maxEntries,
        // ���� 30 ��
        maxAgeSeconds: 30 * 24 * 60 * 60
      }),
      // ʹ�� cacheableResponse �������״̬��Ϊ 0 ������
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

// ������Ĭ�Ϲ���
workbox.routing.setDefaultHandler(
  new workbox.strategies.NetworkFirst({
    options: [
      {
        // ���� 3s ����û����Ӧ�� fallback �� cache
        networkTimeoutSeconds: 3
      }
    ]
  })
);
