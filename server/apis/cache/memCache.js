const Cache = require('node-cache');
const Promise = require('bluebird');

const CACHE_CONFIG= {
    ttl: 60 * 60 * 24,
    checkperiod: 60 * 30
}

const cache = new Cache(CACHE_CONFIG);

function get(k, defaultValue) {
    return new Promise((resolve, reject) => {
        cache.get(k, (err, value) => {
            if (err) {
                reject(err);
            } else {
                if (value === undefined) {
                    resolve(defaultValue);
                } else {
                    resolve(value);
                }
            }
        })
    })
}

function set(k, v) {
    return new Promise((resolve, reject) => {
        cache.set(k, v, (err, success) => {
            if (err || !success) {
                reject(err);
            } else {
                resolve(v);
            }
        })
    })
}

function remove(k) {
    return new Promise((resolve, reject) => {
        cache.del(k, (err, count) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

function clear() {
    return new Promise((resolve, reject) => {
        cache.flushAll();
        resolve();
    })
}

module.exports = {
    get: get,
    set: set,
    remove: remove,
    clear: clear
}