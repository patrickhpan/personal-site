const contentful = require('contentful')
const cache = require('./cache')

let connection = contentful.createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE
})

function createConnection() {
    return connection;
}

function getNewestEntries(contentType, options) {
    if (!contentType) {
        console.error('No content type specified.')
    }

    let {
        limit,
        skip
    } = options;
    let defaultLimit = 10,
        defaultSkip = 0;
    limit = limit || defaultLimit;
    skip = skip || defaultSkip;

    let cacheKey = `contentful#${contentType}#newest#${limit}#${skip}`;
    return cache.get(cacheKey, undefined)
        .then(value => {
            if (value !== undefined) {
                return value;
            }
            return connection.getEntries({
                content_type: contentType,
                limit: limit,
                skip: skip,
                order: "-fields.publishDate"
            }).then(entries => {
                cache.set(cacheKey, entries);
                return entries;
            })
        })
        .catch(err => {
            console.error(err)
            return connection.getEntries({
                content_type: contentType,
                limit: limit,
                skip: skip,
                order: "-fields.publishDate"
            }).then(entries => {
                cache.set(cacheKey, entries);
                return entries;
            })
        })
}

function getEntryBySlug(contentType, slug) {
    let cacheKey = `contentful#${contentType}#entry#${slug}`

    return cache.get(cacheKey)
        .then(value => {
            if (value !== undefined) {
                return value;
            }
            return connection.getEntries({
                content_type: contentType,
                "fields.slug": slug
            }).then(entry => {
                cache.set(cacheKey, entry);
                return entry;
            })
        })
        .catch(err => {
            console.error(err)
            return connection.getEntries({
                content_type: contentType,
                "fields.slug": slug
            }).then(entry => {
                cache.set(cacheKey, entry);
                return entry;
            }).catch(contentfulError => {
                return contentfulError
            })
        })
}

module.exports = {
    createConnection,
    getNewestEntries,
    getEntryBySlug
}