var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var theEarth = (function() {
  var metersPerMile = 0.0006213781; //3959; //miles, 6371 km

  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * metersPerMile);
  }

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / metersPerMile);
  }
  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();

module.exports.locationsListByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  if (!lat || !lng) {
    sendJsonResponse(res, 404, {"message" : "No geo-coordinates in request"})
    return;
  }

  var point = {
    type: "Point", 
    coordinates: [lng, lat]
  }

  var geoOptions = {
    spherical: true,
    maxDistance: theEarth.getRadsFromDistance(10),
    num: 10
  };
  Loc.geoNear(point, geoOptions, function(err, results, stats) {
    if (err) {
      sendJsonResponse(res, 404, err)
      return;
    }
    
    var locations = [];
    results.forEach(function(doc) {
      locations.push({
        distance: theEarth.getDistanceFromRads(doc.dis),
        name: doc.obj.name,
        address: doc.obj.address,
        rating: doc.obj.rating,
        facilities: doc.obj.facilities,
        _id: doc.obj._id
      });
    });
    sendJsonResponse(res, 404, locations);
  });
};

module.exports.locationsCreate = function(req, res) {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(','),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1
    },{
      days: req.body.days2,
      opeining: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2
    }],
    versionKey: false
  }, function(err, location) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, location);
    }
  });
};

module.exports.locationsReadOne = function(req, res) {
  console.log(Loc);
  if (req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) {
          sendJsonResponse(res, 404, {"message" : "locationid not found"});
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, location);      
      });
  } else {
    sendJsonResponse(res, 404, {"message" : "No locationid in request"});
  }
};

module.exports.locationsUpdateOne = function(req, res) {
  if (!req.params.locationid) {
    sendJsonResponse(res, 404, {"message" : "Not found, locationid is required"});
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('-rating -reviews')
    .exec(function(err, location) {
      if (!location) {
        sendJsonResponse(res, 404, {"message" : "Could not find locaiton"});
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      location.name = req.body.name;
      location.address = req.body.address;
      location.facilities = req.body.facilities;
      location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
      location.openingTimes = [{
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      },{
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }];
      location.save(function(err, location) {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          sendJsonResponse(res, 200, location);
        }
      });
    });
};

module.exports.locationsDeleteOne = function(req, res) {
  if (!req.params.locationid) {
    sendJsonResponse(res, 404, {"message" : "Not found, locationid is required"});
    return
  }
  Loc
    .findByIdAndRemove(req.params.locationid)
    .exec(function(err, location) {
      if (!location) {
        sendJsonResponse(res, 404, {"message" : "locationid not found"});
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 204, null);
    });
};

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};