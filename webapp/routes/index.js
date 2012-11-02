var couchdb = require('../custom_modules/dbInterface');

/*
 * GET home page.
 */

exports.index = function(req, res){
  couchdb.getAllUsers(function(users) {
  	console.log(users);
  	res.render('index', { title: "hello" });
  });
};