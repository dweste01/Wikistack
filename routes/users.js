const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', function(req, res, next) {
	User.findAll({})
	.then(function(authorList) {
		res.render('userPage', {users: authorList});
	}).catch(next);
});

router.get('/:id', function(req, res, next) {
	var authorId = req.params.id;
	var authorName,authorEmail;
	User.findOne({
		where: {
			id: authorId
		}
	}).then(function(authorInfo){
		authorName = authorInfo.name
		authorEmail = authorInfo.email;
		return Page.findAll({
			where: {
				authorId: authorId
			}
		})
	}).then(function (pageInfo) {
		res.render('singleUserPage',{name:authorName,email:authorEmail,articles:pageInfo})
	})
	

})