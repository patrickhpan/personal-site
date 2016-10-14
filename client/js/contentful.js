import request from 'request';
import resolveUrl from './resolveUrl'

function getNewestEntries(cb, options) {
    let { limit, skip } = options;
    let qp = { limit, skip };
    request({
        url: resolveUrl('/blog/posts/newest'),
        qp: qp
    }, (err, res, body) => {
        let json = JSON.parse(body)
        cb(json)
    });
}

function getEntryBySlug(cb, slug) {
    if (!slug) return;
    request({
        url: resolveUrl(`/blog/posts/${slug}`)
    }, (err, res, body) => {
        let json = JSON.parse(body);
        cb(json);
    })
}

export {
    getNewestEntries,
    getEntryBySlug
};