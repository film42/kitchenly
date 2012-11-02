/*****************************
    Database Controller
*****************************/

var nano = require('nano')('https://ivowto.iriscouch.com:6984');

/*** couchdb settings ***/
var db = nano.use('kitchenly');


/*************************
    User interfaces
*************************/
exports.getAllUsers = function(cb) {
    db.view("users", 'all', function(err, docs) {
        if(err) throw new Error("getAllUsers " + err)
        cb(docs);
    });
} // _design/users/_view/all
exports.getUserById = function(id) {
    db.view("users", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getUserById " + err)
        cb(doc);
    });
} // _design/users/_view/all?id=###

/*************************
    Venue interfaces
*************************/
exports.getVenueById = function(id) {}

/*************************
    Meal interfaces
*************************/
exports.getMealById = function(id) {}

/*************************
    Review interfaces
*************************/
exports.getReviewById = function(id) {}

/*************************
    Reservation interfaces
*************************/
exports.getReservationById = function(id) {}


/******************
Notes:
- All getByIds are for returning the fully inflated json objectlike

******************/