const Cache = require('file-system-cache');

const cache = Cache.default({
    basePath: './.cache'
});

function get(k, defaultValue) {
    return cache.get(k, defaultValue)
}

function set(k, v) {
    return cache.set(k, v)
}

function remove(k) {
    return cache.remove(k);
}

function clear() {
    return cache.clear();
}

module.exports = {
    get: get,
    set: set,
    remove: remove,
    clear: clear
}