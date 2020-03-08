const express = require('express');
const router = express.Router();

const {signIn, signOut, assert, getMetaData} = require('../controllers/auth');
//for controllers
router.get('/fed/login', signIn);
router.get('/metadata.xml', getMetaData);
router.get('/assert', assert);
router.get('/logout', signOut);

module.exports = router; 