var couchdb = require('../custom_modules/dbInterface');

exports.index = function(req, res) {
    var viewData = { title: 'kitchen.ly - turn your kitchen into a restaurant' };
  	res.render('index', viewData);
};

exports.payment = function(req, res) {
    res.render('payment', { title: "payment" });
};

// Get the search results page.
exports.search = function(req, res) {
    couchdb.performSearch(req.query, function(users) {
        console.log(users);
        var viewData = { title: 'Search results' };
        viewData.users = users;
        res.render('search', viewData);
    });
};


/***********************************
    	User Page
***********************************/
exports.user_index = function(req, res) {
	couchdb.getUserByUsername(req.params.username.toString(), true, function(user) {
    if(!user) res.send('404');
    else {
        var data = {
          title: user.username + " - Kitchenly",
          user: user
        };
		res.render('user_index', data);
    }     
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
exports.register = function(req, res) {
    var viewData = { title: 'kitchen.ly - turn your kitchen into a restaurant' };
    res.render('register', viewData);
};




