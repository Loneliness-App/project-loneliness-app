"use strict";
const express = require('express');
const requestRouter = require('./requests');
//const replyRouter = require('./replies');
const userRouter = require('./users');

let apiRouter = express.Router()
    .use('/requests', requestRouter)
    //.use('/replies', replyRouter)
    .use('/users', userRouter);

module.exports = apiRouter;
