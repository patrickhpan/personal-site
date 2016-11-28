require('dotenv').config();
const request = require('request-promise');
const Promise = require('bluebird')
const cache = require('./cache');

const LIGHTROOM_SPACE = process.env.LIGHTROOM_SPACE;
const LIGHTROOM_ALBUM = process.env.LIGHTROOM_ALBUM;

function createLightroomURL(values) {
    let url = 'https://lightroom.adobe.com/v2c';
    values.forEach(value => {
        if (typeof value === 'object') {
            url += `/${value.key}/${value.value}`;
        } else {
            url += `/${value}`;
        }
    })
    return url;
}

function parseResponse(data) {
    data = data.split(/\n/g);
    data.shift();
    return JSON.parse(data[0]);
}

function createAssetURL(link) {
    return createLightroomURL([{
            key: 'spaces',
            value: LIGHTROOM_SPACE
        },
        link
    ])
}

function getAssets(id) {
    let url = createLightroomURL([{
        key: 'spaces',
        value: LIGHTROOM_SPACE
    }, {
        key: 'assets',
        value: id
    }])

    return request({
            url: url
        })
        .then(parseResponse)
        .then(data => {
            let links = data.links;
            return {
                full: createAssetURL(links['/rels/rendition_type/2048'].href),
                small: createAssetURL(links['/rels/rendition_type/640'].href),
                thumbnail: createAssetURL(links['/rels/rendition_type/thumbnail2x'].href)
            }
        }).catch(console.error);
}

function getImages(space = LIGHTROOM_SPACE, album = LIGHTROOM_ALBUM) {
    let cacheKey = `lightroom#album#${album}`;

    let url = createLightroomURL([{
            key: 'spaces',
            value: space
        }, {
            key: 'albums',
            value: album
        },
        'assets?subtype=image'
    ]);

    return cache.get(cacheKey, undefined)
        .then(value => {
            if (value !== undefined) {
                return value;
            }
            return request({
                    url: url
                })
                .then(parseResponse)
                .then(data => {
                    let ids = data.resources.map(x => x.links.self.href.replace(/^.+\//, ''));
                    return Promise.all(ids.map(getAssets));
                }).then(data => {
                    cache.set(cacheKey, data)
                    return data;
                });
        })
        .catch(err => {
            console.error(err)
            return request({
                    url: url
                })
                .then(parseResponse)
                .then(data => {
                    let ids = data.resources.map(x => x.links.self.href.replace(/^.+\//, ''));
                    return Promise.all(ids.map(getAssets));
                }).then(data => {
                    cache.set(cacheKey, data)
                    return data;
                });
        })
}

function clearCache(album = LIGHTROOM_ALBUM) {
    let cacheKey = `lightroom#album#${album}`;
    return cache.remove(cacheKey)
}

module.exports = {
    getImages,
    getAssets,
    clearCache
}