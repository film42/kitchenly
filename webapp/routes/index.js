var couchdb = require('../custom_modules/dbInterface');

/*
 * GET home page.
 */
/*
exports.index = function(req, res){
  couchdb.getVenueById("bbc32caa7384d2a7e5386412a1001099", true, function(users) {

  	console.log(JSON.stringify(users));
  	res.render('index', { title: "hello" });

  });
};
*/

exports.index = function(req, res) {
    var viewData = { title: 'kitchen.ly - turn your kitchen into a restaurant' };
  	res.render('index', viewData);
};

// Get the search results page.
exports.search = function(req, res) {
    couchdb.getAllUsers(true, function(users) {
        console.log(users);
        var viewData = { title: 'Search results' };
        viewData.users = users;
        res.render('search', viewData);
    });
};

//exports.index = function(req, res) {
//  	res.render('index', { title: "hello" });
//};

/***********************************
    	User Page
***********************************/
exports.user_index = function(req, res) {
	couchdb.getUserByUsername(req.params.username.toString(), true, function(user) {
		res.render('user_index', user);
	});
};
exports.user_reservations = function(req, res) {
	var output = req.params.username + " made reservation " + req.params.id;
	res.send(output);	
};
exports.user_new_reservations = function(req, res) {};

/***********************************
    	Venue Page
***********************************/
exports.venue_index = function(req, res) {};
exports.venue_reservations = function(req, res) {};
exports.venue_checkout = function(req, res) {};
exports.venue_menu = function(req, res) {};
exports.venue_new_meal = function(req, res) {};

/***********************************
    	User Page
***********************************/
exports.login = function(req, res) {};
exports.logout = function(req, res) {};
exports.register = function(req, res) {};





