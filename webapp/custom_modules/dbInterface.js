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
        if(err) throw new Error("getAllUsers " + err);

        for(var i=0;i<docs.rows.length;i++) {
            // Get Reviews
            var reviews = [];
            console.log(docs.rows[i]);
            for(var ri=0;ri<docs.rows[i].value.reviews.length;ri++) {
                exports.getReviewById(
                    docs.rows[i].value.reviews[ri].review_id, function(doc) {
                        reviews.push(doc);
                    }
                );
            }
            //temp_object.reviews = reviews;
            console.log(reviews);
            /*
            // Get Venues
            var venues = [];
            for(venue in object.venues) {
                exports.getVenueById(
                    object.venues[venue], function(doc) {
                        venues.push(doc);
                    }
                );
            }
            object.venues = venues;

            returnThisDoc.push(object);
            */
        }

    });
} // _design/users/_view/all
exports.getUserById = function(id, inflated, cb) {
    db.view("users", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getUserById " + err)
            // Get Reviews
            // Venues
            cb(doc.rows[0].value);
    });
} // _design/users/_view/all?id=###

/*************************
    Venue interfaces
*************************/
exports.getVenueById = function(id, cb) {
    db.view("venues", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getVenueById " + err);
        
        cb(doc.rows[0].value);
    });
}

/*************************
    Meal interfaces
*************************/
exports.getMealById = function(id, cb) {
    db.view("meals", 'all', {key: id}, function(err, doc) {
        if(err) throw new Error("getMealById " + err);
        
        cb(doc.rows[0].value);
    });
}

/*************************
    Review interfaces
*************************/
exports.getReviewById = function(id, cb) {
    console.log("review: " + id);
    db.view("reviews", 'all', function(err, doc) {
        //if(err) throw new Error("getVenueById " + err);
        console.log("REVIEIEIEWIWEI: " + JSON.stringify(doc.rows[0].value));
        cb(doc.rows[0].value);
    });
}

/*************************
    Reservation interfaces
*************************/
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