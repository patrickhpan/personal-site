const express = require('express');
const myContentful = require('../apis/contentful');

let router = express.Router();

router.get('/posts/newest', (req, res) => {
    myContentful.getNewestEntries('blog-post', {
        limit: req.query.limit,
        skip: req.query.skip
    }).then(data => {
        res.json(data)
    }).catch(err => {
        if (err instanceof Error) {
            console.error(err)
        }
        res.json(err)
    })
})

router.get('/posts/:slug', (req, res) => {
    if (!req.params.slug) return;
    myContentful.getEntryBySlug('blog-post',
        req.params.slug
    ).then(data => {
        res.json(data)
    }).catch(err => {
        if (err instanceof Error) {
            console.error(err)
        }
        res.json(err)
    })
})

module.exports = router;