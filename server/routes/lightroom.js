const express = require('express');
const lightroom = require('../apis/lightroom');

let router = express.Router();

router.get('/images', (req, res) => {
    lightroom.getImages()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})

module.exports = router