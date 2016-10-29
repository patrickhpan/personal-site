let cache;

if(process.env.CACHE === 'memory' || process.env.NODE_ENV === 'production') {
    console.log("Using in-memory cache")
    cache = require('./cache/memCache');
} else if (process.env.CACHE === 'none') {
    console.log("Cache disabled")
    cache = require('./cache/noCache');
} else {
    console.log("Using file system cache")
    cache = require('./cache/fsCache');
}

module.exports = cache;