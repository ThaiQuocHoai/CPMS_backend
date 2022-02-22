const express = require('express');
const userRoot = require('./user.router');

const rootRouter = express.Router();

rootRouter.use("/user", userRoot);

module.exports = rootRouter