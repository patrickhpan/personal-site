const express = require('express');
const lightroom = require('../apis/lightroom');

let router = express.Router();

let getImages = (req, res) => {
    let { space, album } = req.query;
    let promise = ( space && album ) ? lightroom.getImages(space, album) : lightroom.getImages()
    promise
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
}

router.get('/images/:album', getImages)
router.get('/images/', getImages)

router.get('/clear', (req, res) => {
    lightroom.clearCache()
        .then(() => {
            res.end("cleared")
        })
        .catch(err => {
            res.json(err)
        });
})

module.exports = router