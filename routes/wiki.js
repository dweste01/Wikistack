const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', function (request,response,next) {
	response.redirect('/');
})

router.post('/', function (request,response,next) {
	var body = request.body;
	var newPage = Page.build({
		title: body.title,
		content:body.pageContent
	});

	newPage.save().then(function (value) {
		// response.json(value);
		response.redirect(value.route);
	});
})

router.get('/add', function (request,response,next) {
	response.render('addPage');
})


router.get('/:url', function(request, response) {
	var url = request.params.url;
	console.log(url);
	Page.findOne({ where: {urlTitle: url}  })
	.then(function(row) {
		// response.json(row);
		response.render('wikipage',{article:row});
	})
})
