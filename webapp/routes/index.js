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

exports.index = function(req, res) {
  	res.render('index', { title: "hello" });
};

// Get the search results page.
exports.searchResults = function(req, res) {
    couchdb.getAllUsers(function(users) {
        //var users = { };
        var viewData = { title: 'Search results' };
        viewData.users = users;
        res.render('results', viewData);
    });
};

// Get the user details page.
exports.user = function(req, res) {
    couchdb.getUserById(req.userId, true, function(user) {
        //var user = { name: {first_name:"Byron", last_name: "Hundley"}, photo_url: "//lh4.googleusercontent.com/-gP3mcTlmkFQ/AAAAAAAAAAI/AAAAAAAAAAA/aSzXUf-kBk0/s27-c/photo.jpg"};
        var viewData = { title: 'User' };
        viewData.user = user;
        res.render('userInfo', viewData);
    });
};