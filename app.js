const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes')
const PORT = 3000;

//Rendering Section
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

//Logging Middleware
app.use(morgan('dev'));

// Body Parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Static files CSS and whatnot
app.use(express.static(path.join(__dirname,'/public')))

//Routes
app.use('/',routes);

//Listening on Port
app.listen(PORT, function () {
	console.log(`On ${PORT}`);
})

