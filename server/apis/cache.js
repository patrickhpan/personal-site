module.exports = (process.env.NODE_ENV === 'production' ? 
    require('./cache/memCache') : 
    require('./cache/fsCache')
)