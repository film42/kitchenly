var couchdb = require('../custom_modules/dbInterface');

/*
 * GET home page.
 */

exports.index = function(req, res){
  couchdb.getAllUsers(function(users) {
  	res.render('index', { title: users.username });
  });
};