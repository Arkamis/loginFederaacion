const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');

const {signIn, signOut, assert, getMetaData} = require('../controllers/auth');
//for controllers
router.get('/fed/login', signIn);
router.get('/metadata.xml',middleware.checkUser, getMetaData);
router.get('/logout', middleware.checkUser, signOut);
router.post('/assert', assert);

module.exports = router; 