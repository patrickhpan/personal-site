import request from 'request-promise';
import resolveUrl from './resolveUrl';
import Promise from 'bluebird';

let cachedValue = null;

function getImages() {
    if (cachedValue !== null) {
        return Promise.resolve(cachedValue);
    }
    return request({
        url: resolveUrl('/lightroom/images')
    }).then(body => {
        cachedValue = JSON.parse(body);
        return cachedValue
    });
}

export {
    getImages
}