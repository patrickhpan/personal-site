import url from 'url';

function resolveUrl(relative) {
    return url.resolve(window.location.href, relative)
}

export default resolveUrl;