import request from 'request-promise';
import resolveUrl from './resolveUrl';

function getImages() {
    return request({
        url: resolveUrl('/lightroom/images')
    }).then(body => JSON.parse(body));
}

export {
    getImages
}