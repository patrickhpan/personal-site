const Promise = require('bluebird');

const PROMISE_CONSTRUCTOR = (resolve, reject) => {
    reject();
}

function get(k, defaultValue) {
    return new Promise(PROMISE_CONSTRUCTOR)
}

function set(k, defaultValue) {
    return new Promise(PROMISE_CONSTRUCTOR)
}

function remove(k) {
    return new Promise(PROMISE_CONSTRUCTOR)
}

function clear() {
    return new Promise(PROMISE_CONSTRUCTOR)
}

module.exports = {
    get: get,
    set: set,
    remove: remove,
    clear: clear
}