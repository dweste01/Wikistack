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
	User.findOne({
		where: {
			email:body.authorEmail
		}
	}).then(function (authorRow) {
		if(!authorRow){
			addNewUser(body,response)
		}else{
			NewPageWithAuthor(body,authorRow,response)
		}
	})
	
});


router.get('/add', function (request,response,next) {
	response.render('addPage');
})


router.get('/:url', function(request, response) {
	var url = request.params.url;
	
	Page.findOne({ where: {urlTitle: url}  })
	.then(function(row) {
		// response.json(row);
		response.render('wikipage',{article:row});
	})
})

// create user 
function addNewUser(httpBody,responseObject) {
	return User.build({
		name: httpBody.authorName,
		email:httpBody.authorEmail
	}).save()
	.then(function (value) {
		return Page.build({
			title: httpBody.title,
			content:httpBody.pageContent,
			authorId:value.id
		}).save();
	}).then(function(val) {
		responseObject.redirect('/');
	});
}

function NewPageWithAuthor(httpBody,authorInfo,responseObject) {
	Page.build({
		title: httpBody.title,
		content:httpBody.pageContent,
		authorId:authorInfo.id
	}).save()
	.then(function (value) {
		responseObject.redirect('/');
	})
}



