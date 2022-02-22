const express = require('express');
const { testApp, authenticate, test } = require('../controllers/user.controller');
const { checkLoginType } = require('../middlewares/authenticate');


const userRoot = express.Router();

userRoot.post("/login",checkLoginType, authenticate);
userRoot.get("/test", test);

module.exports = userRoot
