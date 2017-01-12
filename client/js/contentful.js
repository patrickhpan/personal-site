import request from 'request-promise';
import resolveUrl from './resolveUrl'

let newestEntriesCache = {};
let tagEntriesCache = {};
let entryBySlugCache = {};

function getNewestEntries(options) {
    let key = JSON.stringify(options);
    if (newestEntriesCache[key] === undefined) {
        let { limit, skip } = options;
        let qp = { limit, skip };
        return request({
            url: resolveUrl('/cms/posts/newest'),
            qp: qp
        })
            .then(JSON.parse)
            .then(body => {
                newestEntriesCache[key] = body;
                return body;
            });
    } else {
        return new Promise(resolve => {
            resolve(newestEntriesCache[key])
        });
    }
}

function getEntriesByTag(tag, options) {
    let key = JSON.stringify({
        tag: tag,
        options: options
    })
    if (tagEntriesCache[key] === undefined) {
        let { limit, skip } = options;
        let qp = { limit, skip };
        return request({
            url: resolveUrl(`/cms/posts/tag/${tag}`),
            qp: qp
        })
            .then(JSON.parse)
            .then(body => {
                tagEntriesCache[key] = body;
                return body;
            });
    } else {
        return new Promise(resolve => {
            resolve(tagEntriesCache[key])
        });
    }
}

function getEntryBySlug(slug) {
    if (!slug) return;
    return request({
        url: resolveUrl(`/cms/posts/${slug}`)
    }).then(body => JSON.parse(body))
}

export {
    getNewestEntries,
    getEntriesByTag,
    getEntryBySlug
};