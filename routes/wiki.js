var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page; 
var User = models.User; 

module.exports = router;

router.get('/', (req, res, next) => {
	res.redirect('/');
});

router.get('/add', (req, res, next) => {
	res.render('addpage');
});

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(function(createdPage) {
  	console.log(createdPage);
  	res.redirect('/');
  }).catch(function() {
  	res.render('error');
  });
  // -> after save -> res.redirect('/');
});

