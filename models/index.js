const Seq = require('sequelize');
const db = new Seq('postgres://localhost:5432/wikistack',{
	logging:false
});

var Page = db.define("page", {
	title:{
		type:Seq.STRING,
		allowNull:false
	},
	urlTitle:{
		type:Seq.STRING,
		allowNull:false
	},
	content:{
		type:Seq.TEXT,
		allowNull:false
	},
	status:{
		type:Seq.ENUM('open','closed')
	},
	date: {
		type:Seq.DATE,
		defaultValue:Seq.NOW
	}

},{
	getterMethods :{
		route: function () {
			return "/wiki/"+ this.getDataValue('urlTitle');
		}
	}
});

Page.hook('beforeValidate',function (newPage) {
	var url = newPage.dataValues.title;
	if(url){
		newPage.dataValues.urlTitle = url.replace(/\s+/,"_").replace(/\W/g,'');
	}else{
		newPage.dataValues.urlTitle =  Math.random().toString(36).substring(2,7);
	}
})


var User = db.define("user", {
	name:{
		type:Seq.STRING,
		allowNull:false
	},
	email:{
		type:Seq.STRING,
		allowNull:false
		// validate:{
		// 	isEmail:true
		// }	
	}
})


module.exports = {
	Page:Page,
	User:User,
	db:db
}