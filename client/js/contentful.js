import request from 'request-promise';
import resolveUrl from './resolveUrl'

function getNewestEntries(options) {
    let { limit, skip } = options;
    let qp = { limit, skip };
    return request({
        url: resolveUrl('/blog/posts/newest'),
        qp: qp
    }).then(body => JSON.parse(body));
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