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
  	res.render('index', { title: "hello" });
};
/*
// Get the search results page.
exports.searchResults = function(req, res) {
    couchdb.getAllUsers(function(users) {
        //var users = { };
        var viewData = { title: 'Search results' };
        viewData.users = users;
        res.render('search', viewData);
    });
};

// Get the user details page.
exports.user = function(req, res) {
    couchdb.getUserById(req.userId, true, function(user) {
        //var user = { name: {first_name:"Byron", last_name: "Hundley"}, photo_url: "//lh4.googleusercontent.com/-gP3mcTlmkFQ/AAAAAAAAAAI/AAAAAAAAAAA/aSzXUf-kBk0/s27-c/photo.jpg"};
        var viewData = { title: 'User' };
        viewData.user = user;
        res.render('user', viewData);
    });
};*/

exports.index = function(req, res) {
  	res.render('index', { title: "hello" });
};

/***********************************
    	User Page
***********************************/
exports.user_index = function(req, res) {};
exports.user_reservations = function(req, res) {};
exports.user_new_reservations = function(req, res) {};

/***********************************
    	Venue Page
***********************************/
exports.venue_index = function(req, res) {};
exports.venue_reservations = function(req, res) {};
exports.venue_checkout = function(req, res) {};
exports.venue_menu = function(req, res) {};
exports.new_menu = function(req, res) {};

/***********************************
    	User Page
***********************************/
exports.login = function(req, res) {};
exports.logout = function(req, res) {};
exports.register = function(req, res) {};






