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

function getImages(album = LIGHTROOM_ALBUM) {
    let cacheKey = `lightroom#album#${album}`;
    
    let url = createLightroomURL([{
            key: 'spaces',
            value: LIGHTROOM_SPACE
        }, {
            key: 'albums',
            value: album
        },
        'assets?subtype=image'
    ]);

    return request({
            url: url
        })
        .then(parseResponse)
        .then(data => {
            let ids = data.resources.map(x => x.links.self.href.replace(/^.+\//, ''));
            return Promise.all(ids.map(getAssets));
        });
}

module.exports = {
    getImages,
    getAssets
}