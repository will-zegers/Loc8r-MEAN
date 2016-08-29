var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://obscure-thicket-50389.herokuapp.com";
}

/* Helper functions */
var _formatDistance = function(distance) {
  var numDistance, unit;
  if (distance > 1) {
    numDistance = parseFloat(distance.toFixed(1));
    unit = " miles";
  } else {
    numDistance = parseInt(distance * 528,10) * 10;
    unit = ' feet';
  }
  return numDistance + unit;
};

var _showError = function(req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {title : title, content : content});
};

var getLocationInfo = function(req, res, callback) {
  var requestOptions, path;
  path = '/api/locations/' + req.params.locationid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  
  request(requestOptions, function(err, response, body){
    if (response.statusCode === 200) {
       callback(req, res, body);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
}

/* GET home page */
var renderHomepage = function(req, res) {
  // var message;
  // if (!(responseBody instanceof Array)) {
  //   message = "API lookup error";
  //   responseBody = [];
  // } else {
  //   if (!responseBody.length) {
  //     message = "No places nearby";
  //   }
  // }
  res.render('locations-list', { 
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    // locations: responseBody,
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you're looing for.",
    // message: message
  });
};

module.exports.homelist = function(req, res) {
  // var requestOptions, path;
  // path = '/api/locations/';
  // requestOptions = {
  //   url : apiOptions.server + path,
  //   method : "GET",
  //   json : {},
  //   qs : {
  //     lng : -117.2287834,
  //     lat : 32.8680875,
  //     maxDistance : 20
  //   }
  // };

  // request(requestOptions, function(err, response, body) {
  //   if (response.statusCode == 200) {
  //     for (var i = 0; i < body.length; i++) {
  //       body[i].distance = _formatDistance(body[i].distance);
  //     }
  //   }
    renderHomepage(req, res);
  // });
};

/* GET 'Locations info' page */
var renderDetailPage = function(req, res, locDetail) {
  res.render('location-info', {
    title: locDetail.name,
    pageHeader: {
      title: locDetail.name,
    },
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: locDetail
  });
};

module.exports.locationInfo = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

/* GET 'Add review' page */
var renderReviewForm = function(req, res, responseData) {
  res.render('location-review-form', {
    title: 'Review ' + responseData.name + ' on Loc8r',
    pageHeader: {title: 'Review ' + responseData.name},
    error: req.query.err,
    url: req.originalUrl
  });
}

module.exports.addReview = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
};

/*POST 'Add review' page */
module.exports.doAddReview = function(req, res) {
  var requestOptions, path, locationid, postData;

  locationid = req.params.locationid;
  if (!req.body.name || !req.body.rating) {
    res.redirect('/location/' + locationid + '/review/new?err=val');
    return;
  }

  path = '/api/locations/' + locationid + '/reviews';
  postData = {
    author : req.body.name,
    rating : req.body.rating,
    reviewText : req.body.review
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postData
  }
  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 201) {
      res.redirect('/location/' + locationid);
    } else if (response.statusCode === 400 && body.name && body.name === 'ValidationError') {
        res.redirect('/location/' + locationid + '/review/new?err=val');
    } else {
      _showError(req, res, response.statusCode);
    }
  });
}