// This is the "Offline page" service worker
/*
 This code uses the pwa-update web component https://github.com/pwa-builder/pwa-update to register the service worker and tell the user when there is an update available and let the user know when the PWA is ready to use offline.
*/

import "https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate";
const el = document.createElement("pwa-update");
document.body.appendChild(el);
