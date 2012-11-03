/*****************************
    Database Controller
*****************************/

//var nano = require('nano')('https://ivowto.iriscouch.com:6984');
var nano = require('nano')('http://localhost:5984');
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
        else {
            if(doc.rows.length > 0)
                cb(doc.rows[0].value);
            else
                cb(null)
        }   
    });
} // _design/users/_view/all?id=###

exports.getUserByUsername = function(id, inflate, cb) {          // tested
    db.view("users", 'username', {key: id}, function(err, doc) {
        if(err) throw new Error("getUserByUsername " + err);
        if(inflate && doc.rows.length > 0)
            inflateUser(doc.rows[0].value, function(user) {
                cb(user);
            });
        else {
            if(doc.rows.length > 0)
                cb(doc.rows[0].value);
            else
                cb(null)
        }   
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
                        exports.getVenueById(venue.venue_id, false, function(new_venue) {
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
                //console.log(venue);
                cb(venue);
            });
        else {
            if(doc.rows.length > 0)
                cb(doc.rows[0].value);
            else
                cb(null)
        }   
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
        else {
            if(doc.rows.length > 0)
                cb(doc.rows[0].value);
            else
                cb(null)
        }   
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
        if(err) throw new Error("getVenueById " + err);
        else {
            if(doc.rows.length > 0)
                cb(doc.rows[0].value);
            else
                cb(null)
        }   
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
        
        else {
            if(doc.rows.length > 0)
                cb(doc.rows[0].value);
            else
                cb(null)
        }   
    });
}

/*************************
    Perform search
*************************/
exports.performSearch = function(params, cb) {
    // Let's get our params first
    var query = [];
    if(params.city && params.state) {
        var location = {
            city: params.city,
            state: params.state
        }
        query.push({type: 'location', location: location});
    }
    if(params.date) query.push({type: 'date', param: params.date});
    if(params.guests) query.push({type: 'guests', param: params.guests});

    //Now we have our working array. But really we just need to proccess
    exports.getAllUsers(true, function(docs) {
        if(query.length == 0) {
            cb(docs);
            return;
        }

        var search_results = [];

        each(docs).on('item', function(next, user, index) {
            /////// PARSE EACH USERS VENUES
            proccessSearchVenuesHelper(user.venues, query, function(data) {
                if(data) {
                    //console.log(data);

                    var addToResult = true;
                    each(data).on('item', function(next2, venue, index) {
                        each(search_results).on('item', function(next3, venue2, index) {

                            if(venue2 == venue)
                                addToResult = false;

                        next3();
                       }).on('end', function() {
                            if(addToResult) {
                                search_results.push(data);
                            }
                       });  

                        next2();
                    }).on('end', function() {});

                    next();
                }
            });
        }).on('end', function() {
            console.log("got here");
            //console.log(search_results.length);
            //cb(search_results);
            fillUserSearch(search_results, function(done) {
                cb(done);
            });
        });
    });
}

var fillUserSearch = function(results, cb) {
    var returnArr = [];

    each(results).on('item', function(next, obj, index) {
        console.log('ADASD: ' + JSON.stringify(obj));

        exports.getUserById(obj[0].user_id, true, function(user) {
            user.venues = obj;
            returnArr.push(user);

            next();
        });
    }).on('end', function() {
        cb(returnArr);
    });
}

var proccessSearchVenuesHelper = function(docs, query, cb) {

    each(docs).on('item', function(next, doc, index) {
        /////// NOW WE TEST EACH DOC
        var addToList = true;

        search_results = [];

        each(query).on('item', function(next2, item2, index2) {
            if(item2.type == "guests") {
                /////// IF NOT GUESTS AMOUNT
                var gusets = parseInt(item2.param);
                if(gusets > doc.guest_limit.maximum || gusets < doc.guest_limit.minimum)
                    addToList = false;
            }
            if(item2.type == "date") {
                /////// IF NOT A DATE
                // later
            }
            if(item2.type == "location") {
                /////// IF NOT A DATE
                if(doc.location.city != item2.location.city || doc.location.state != item2.location.state)
                    addToList = false;
            }
            // ITERATION POINT
            next2();
        }).on('end', function() {
            if(addToList) {
                search_results.push(doc);
                console.log('added ' + doc.name);
            }
            else {
                //console.log('didnt pass:' + JSON.stringify(doc));
            }
            // ITERATION POINT
                next();
        });
    }).on('end', function() {
        cb(search_results);
        console.log("got here");
        return;
    });
}

/*
exports.performSearch = function(params, cb) {
    // Let's get our params first
    var query = [];
    if(params.city && params.state) {
        var location = {
            city: params.city,
            state: params.state
        }
        query.push({type: 'location', location: location});
    }
    if(params.date) query.push({type: 'date', param: params.date});
    if(params.guests) query.push({type: 'guests', param: params.guests});

    //Now we have our working array. But really we just need to proccess
    exports.getAllVenues(true, function(docs) {
        if(query.length == 0) {
            cb(docs);
            return;
        }

        var search_results = [];

        each(docs).on('item', function(next, doc, index) {
            /////// NOW WE TEST EACH DOC
            var addToList = true;
            each(query).on('item', function(next2, item2, index2) {
                if(item2.type == "guests") {
                    /////// IF NOT GUESTS AMOUNT
                    var gusets = parseInt(item2.param);
                    if(gusets > doc.guest_limit.maximum || gusets < doc.guest_limit.minimum)
                        addToList = false;
                }
                if(item2.type == "date") {
                    /////// IF NOT A DATE
                    // later
                }
                if(item2.type == "location") {
                    /////// IF NOT A DATE
                    if(doc.location.city != item2.location.city || doc.location.state != item2.location.state)
                        addToList = false;
                }
                // ITERATION POINT
                next2();
            }).on('end', function() {
                if(addToList) {
                    search_results.push(doc);
                    console.log(search_results);
                }
                else {
                    //console.log('didnt pass:' + JSON.stringify(doc));
                }
                // ITERATION POINT
                    next();
            });
        }).on('end', function() {
            console.log("got here");
            cb(search_results);
        });
    });
}


/******************
Notes:
- All getByIds are for returning the fully inflated json objectlike
******************/