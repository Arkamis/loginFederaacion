const express = require('express');
const router = express.Router();

const {signIn, signOut, assert, getMetaData} = require('../controllers/auth');
//for controllers
router.get('/login', signIn);
router.get('/metadata.xml', getMetaData);
router.get('/logout');

module.exports = router; 