/*****************************
    Database Controller
*****************************/

var nano = require('nano')('https://ivowto.iriscouch.com:6984');
var each = require('each');

/*** couchdb settings ***/
var db = nano.use('kitchenly');


/*************************
    User interfaces
*************************/
exports.getAllUsers = function(inflate, cb) {               // tested
    db.view("users", 'all', function(err, docs) {
        if(err) throw new Error("getAllUsers " + err);
        if(inflate)
            inflateUsers(docs.rows, function(users) {
                cb(users);
            });
        else  {
            var only_users = [];
            each(docs.rows)
                .on('item', function(next, user, index) {
                    only_users.push(user);
                    next();
                })
                .on('end', function() {
                    cb(only_users);
                });
        }
    });
} // _design/users/_view/all
exports.getUserById = function(id, inflate, cb) {           // tested
    db.view("users", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getUserById " + err);
        if(inflate)
            inflateUser(doc.rows[0].value, function(user) {
                cb(user);
            });
        else
            cb(doc.rows[0].value);
    });
} // _design/users/_view/all?id=###
    
    // HELPERS
    var inflateUsers = function(users, cb) {                // tested
        var new_users = [];
        each(users)
            .on('item', function(next, user, index) {
                inflateUser(user.value, function(new_user) {
                    new_users.push(new_user);
                    next();
                })
            })
            .on('end', function() {
                cb(new_users);
            }); 
    }
    var inflateUser = function(user, cb) {               // tested
        var reviews = [], venues = [];
        each(user.reviews)
            .on('item', function(next, review, index) {
                exports.getReviewById(review._id, function(new_review) {
                    reviews.push(new_review);
                    next();
                });
            })
            .on('end', function() {
                user.reviews = reviews;
                each(user.venues)
                    .on('item', function(next, venue, index) {
                        exports.getVenueById(venue.venue_id, function(new_venue) {
                            venues.push(new_venue);
                            next();
                        });
                    })
                    .on('end', function() {
                        user.venues = venues;
                        cb(user);
                    })
            })
    }

/*************************
    Venue interfaces
*************************/
exports.getAllVenues = function(inflate, cb) {
    db.view("venues", 'all', function(err, docs) {                     // tested 
        if(err) throw new Error("getAllVenues " + err);
        if(inflate)
            inflateVenues(docs.rows, function(venues) {
                cb(venues);
            });
        else  {
            var only_venues = [];
            each(docs.rows)
                .on('item', function(next, venue, index) {
                    only_venues.push(venue);
                    next();
                })
                .on('end', function() {
                    cb(only_venues);
                });
        }
    });
} // _design/users/_view/all
exports.getVenueById = function(id, inflate, cb) {                     // tested 
    db.view("venues", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getVenueById " + err);
        if(inflate)
            inflateVenue(doc.rows[0].value, function(venue) {
                cb(venue);
            });
        else
            cb(doc.rows[0].value);
    });
}

// HELPERS
    var inflateVenues = function(venues, cb) {
        var new_venues = [];
        each(venues)
            .on('item', function(next, venue, index) {
                inflateVenue(venue.value, function(new_venue) {
                    new_venues.push(new_venue);
                    next();
                })
            })
            .on('end', function() {
                cb(new_venues);
            }); 
    }
    var inflateVenue = function(venue, cb) {
        var reviews = [], meals = [];
        each(venue.reviews)
            .on('item', function(next, review, index) {
                exports.getReviewById(review._id, function(new_review) {
                    reviews.push(new_review);
                    next();
                });
            })
            .on('end', function() {
                venue.reviews = reviews;
                each(venue.meals)
                    .on('item', function(next, meal, index) {
                        exports.getMealById(meal.meal_id, function(new_meal) {
                            meals.push(new_meal);
                            next();
                        });
                    })
                    .on('end', function() {
                        venue.meals = meals;
                        cb(venue);
                    })
            })
    }

/*************************
    Meal interfaces
*************************/
exports.getAllMeals = function(cb) {                      // tested 
    db.view("meals", 'all', function(err, docs) {
        if(err) throw new Error("getAllMeals " + err);

        var only_meals = [];
            each(docs.rows)
                .on('item', function(next, meal, index) {
                    only_meals.push(meal);
                    next();
                })
                .on('end', function() {
                    cb(only_meals);
                });
    });
}
exports.getMealById = function(id, cb) {                   // tested 

    db.view("meals", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getMealById " + err);
        cb(doc.rows[0].value);
    });
}

/*************************
    Review interfaces
*************************/
exports.getAllReviews = function(cb) {                   // tested 
    db.view("reviews", 'all', function(err, docs) {
        if(err) throw new Error("getAllReviews " + err);

        var only_reviews = [];
            each(docs.rows)
                .on('item', function(next, review, index) {
                    only_reviews.push(review);
                    next();
                })
                .on('end', function() {
                    cb(only_reviews);
                });
    });
}
exports.getReviewById = function(id, cb) {                // tested
    db.view("reviews", 'all', function(err, doc) {
        //if(err) throw new Error("getVenueById " + err);
        cb(doc.rows[0].value);
    });
}

/*************************
    Reservation interfaces
*************************/
exports.getAllReservations = function(cb) {
    db.view("reservations", 'all', function(err, docs) {
        if(err) throw new Error("getAllReservations " + err);

        var only_reservations = [];
            each(docs.rows)
                .on('item', function(next, reservation, index) {
                    only_reservations.push(reservation);
                    next();
                })
                .on('end', function() {
                    cb(only_reservations);
                });
    });
}
exports.getReservationById = function(id, cb) {
    db.view("reservations", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getReservationById " + err);
        
        cb(doc.rows[0].value);
    });
}


/******************
Notes:
- All getByIds are for returning the fully inflated json objectlike
******************/