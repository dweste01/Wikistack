const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', function (request,response,next) {
	response.render('index')
})



