var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var doAddReview = function(req, res, location) {
  if(!location) {
    sendJsonResponse(res, 404, {"message" : "location not found"});
    return;
  }
  location.reviews.push({
    author: req.body.name,
    rating: req.body.rating,
    reviewText: req.body.reviewText
  });

  location.save(function(err, location) {
    var thisReview;

    if (!err) {
      updateAverageRating(location._id);
      thisReview = location.reviews[location.reviews.length - 1];
      sendJsonResponse(res, 201, thisReview);
    } else {
      sendJsonResponse(res, 404, err);
    }
  });
}

var updateAverageRating = function(locationId) {
  console.log("[*] updateAverageRating");
  Loc
    .findById(locationId)
    .select('rating reviews')
    .exec(function(err, location) {
      if (!err) {
        doSetAverageRating(location);
      }
    });
}

var doSetAverageRating = function(location) {
  console.log("[*] doSetAverageRating");
  var i, reviewCount, ratingAverage, ratingTotal;
  if (location.reviews && location.reviews.length > 0) {
    reviewCount = location.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;
    location.save(function(err, location) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to ", ratingAverage);
      }
    });
  }  
}

module.exports.reviewsCreate = function(req, res) {
  var locationid = req.params.locationid;
  if (locationid) {
    Loc
      .findById(locationid)
      .select('reviews')
      .exec(function(err, location) {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          doAddReview(req, res, location);
        }
      });
  }
};

module.exports.reviewsReadOne = function(req, res) {
  if (req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(function(err, location) {
        if (!location) {
          sendJsonResponse(res, 404, {"message" : "locationid not found"});
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        if (location.reviews && location.reviews.length > 0) {
          review = location.reviews.id(req.params.reviewid);
          console.log(location.reviews);
          if (!review) {
            sendJsonResponse(res, 404, {"message" : "reviewid not found"});
          } else {
            response = {
              location : {
                name : location.name,
                id : req.params.locationid
              },
              review : review
            }
            sendJsonResponse(res, 200, response);
          }
        } else {
          sendJsonResponse(res, 404, {"message" : "No reviews found"});
        }   
      });
  } else {
    sendJsonResponse(res, 404, {"message" : "No locationid in request"});
  }

};

module.exports.reviewsUpdateOne = function(req, res) {
  if (!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {"message" : "Not found, locationid and reviewid are both required"});
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec(function(err, location) {
      var thisReview;

      if (!location) {
        sendJsonResponse(res, 404, {"message" : "locationid not found"});
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      if (location.reviews && location.reviews.length > 0) {
        console.log("Here");
        thisReview = location.reviews.id(req.params.reviewid);
        if (!thisReview) {
          sendJsonResponse(res, 404, {"message" : "reviewid not found"});
          return;
        }
        thisReview.author = req.body.author;
        thisReview.rating = req.body.rating;
        thisReview.reviewText = req.body.reviewText;
        location.save(function(err, location) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            updateAverageRating(location._id);
            sendJsonResponse(res, 201, thisReview)
          }
        });
      } else {
        sendJsonResponse(res, 404, {"message" : "No review to update"});
      }
    });
};

module.exports.reviewsDeleteOne = function(req, res) {
  if (!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {"message" : "Not found, locationid and reviewid are both required"});
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec(function(err, location) {
      if (!location) {
        sendJsonResponse(res, 404, {"message" : "locationid not found"});
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }

      if (location.reviews && location.reviews.length > 0) {
        if (!location.reviews.id(req.params.reviewid)) {
          sendJsonResponse(res, 404, {"message" : "reviewid not found"});
          return;
        }
        location.reviews.id(req.params.reviewid).remove();
        location.save(function(err) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 204, null);
          }
        });
      } else {
        sendJsonResponse(res, 404, {"message" : "No review to delete"});
      }
    });
};

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};