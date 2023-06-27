// Check if Pushwoosh service worker is already active
if (!self.registration.active || !self.registration.active.scriptURL.includes('cache_clean')) {
    // eslint-disable-next-line no-undef
    importScripts('https://cdn.pushwoosh.com/webpush/v3/pushwoosh-service-worker.js')
}
