const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log(err);
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintains.hbs');
// 	// next();
// });

//add html or some static page here
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//use api calls
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'I\'m your father ya.'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMsg: 'Bad Page'
	});
});

app.listen(3000, () => {
	console.log('server is working on 3000 now');
});