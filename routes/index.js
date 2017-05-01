const express = require('express');
const router = express.Router();
const wikiPages = require('./wiki');
const userPages = require('./users');
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', function (request,response,next) {
	Page.findAll({})
	.then(function(allArticles) {
		response.render('index', {pages: allArticles})
	})
	// response.render('index')
})

router.use('/wiki', wikiPages)
router.use('/user', userPages)






