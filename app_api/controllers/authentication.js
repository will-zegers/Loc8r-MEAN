var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      'message' : 'All fields required'
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    if (err) {
      var errMsg;
      if (err.code === 11000) {
        errMsg = { 'message' : 'That email is already registered'};
      } else {
        errMsg = err;
      }
      sendJSONresponse(res, 404, errMsg);
    } else {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        'token' : token
      });
    }
  });
};

module.exports.login = function(req, res) {
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 404, {
      'message' : 'All field required'
    });
  }

  passport.authenticate('local', function(err, user, info) {
    console.log("Here");
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user) {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        'token' : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);
}
