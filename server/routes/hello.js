const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.end('hello world')
}) 

module.exports = router;