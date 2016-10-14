const contentful = require('contentful');

let connection = contentful.createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE
})

function createConnection() {
    return connection;
}

function getNewestEntries(contentType, options) {
    if(!contentType) {
        console.error('No content type specified.')
    }

    let { limit, skip } = options;
    let defaultLimit = 10,
        defaultSkip = 0;

    return connection.getEntries({
        content_type: contentType,
        limit: limit || defaultLimit,
        skip: skip || defaultSkip,
        order: "-fields.publishDate"
    })
}

function getEntryBySlug(contentType, slug) {
    return connection.getEntries({
        content_type: contentType, 
        "fields.slug": slug
    })
}

module.exports = {
    createConnection,
    getNewestEntries,
    getEntryBySlug
}