var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI);

/* Monitor connetion events */
mongoose.connection.on('connected', function() {
  console.log('[+] Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('[-] Mongoosex connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('[!] Mongoose disconnected');
});


/* Close DB connection and then shutdown */
var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('[i] Mongoose disconnected through ' + msg);
    callback();
  });
}

process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  gracefulShutdown('Heroku ap shutdown', function() {
    process.exit(0);
  });
});