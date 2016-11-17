import request from 'request-promise';
import resolveUrl from './resolveUrl'

let newestEntriesCache = {};
let entryBySlugCache = {};

function getNewestEntries(options) {
    let key = JSON.stringify(options);
    if (newestEntriesCache[key] === undefined) {
        let { limit, skip } = options;
        let qp = { limit, skip };
        return request({
            url: resolveUrl('/blog/posts/newest'),
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

function getEntryBySlug(slug) {
    if (!slug) return;
    return request({
        url: resolveUrl(`/blog/posts/${slug}`)
    }).then(body => JSON.parse(body))
}

export {
    getNewestEntries,
    getEntryBySlug
};