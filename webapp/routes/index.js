var couchdb = require('../custom_modules/dbInterface');

/*
 * GET home page.
 */

exports.index = function(req, res){
  couchdb.getVenueById("bbc32caa7384d2a7e5386412a1001099", true, function(users) {

  	console.log(JSON.stringify(users));
  	res.render('index', { title: "hello" });

  });
};