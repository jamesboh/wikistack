'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var models = require('./models');
var wikiRouter = require('./routes/wiki');

var app = express();

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/wiki', wikiRouter);


// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);




models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

// app.listen(1337, function() {
// 	console.log('listening on port 1337');
// })