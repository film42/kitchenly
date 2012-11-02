/*****************************
    Database Controller
*****************************/

var nano = require('nano')('https://ivowto.iriscouch.com:6984');

/*** couchdb settings ***/
var db = nano.use('kitchenly');


/*************************
    User interfaces
*************************/
exports.getAllUsers = function(inflated, cb) {
    db.view("users", 'all', function(err, docs) {
        if(err) throw new Error("getAllUsers " + err) {
            for(object in docs.rows) {
                // Get Reviews
                var reviews;
                for(review in object.reviews) {
                    reviews.push(exports.getReviewById);
                }
                object.reviews = reviews;

                var venues;
                // Venues
            }
        }
    });
} // _design/users/_view/all
exports.getUserById = function(id, inflated, cb) {
    db.view("users", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getUserById " + err)
            // Get Reviews
            // Venues
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