import contentful from 'contentful';

console.log(process.env)
let connection = contentful.createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE
})

function createConnection() {
    return connection;
}

function getNewestEntries(cb, contentType, limit = 10, skip = 0) {
    connection.getEntries({
        content_type: contentType,
        limit: limit,
        skip: skip,
        order: "-fields.publishDate"
    }).then(cb).catch(console.error)
}

function getEntryBySlug(cb, contentType, slug) {
    connection.getEntries({
        content_type: contentType, 
        "fields.slug": slug
    }).then(cb).catch(console.error)
}

window.contentful = connection;
window.getNewestEntries = getNewestEntries;
window.getEntryBySlug = getEntryBySlug;

export default createConnection;
export {
    getNewestEntries,
    getEntryBySlug
}