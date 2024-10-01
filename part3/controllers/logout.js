const { blacklist } = require('../utils/middleware');
const logoutRouter = require('express').Router()

//an in-memory blacklist
logoutRouter.post('/', (req, res) => {
    blacklist.push(req.token);
    console.log('blacklist', blacklist);
    res.sendStatus(200);
});

module.exports = logoutRouter