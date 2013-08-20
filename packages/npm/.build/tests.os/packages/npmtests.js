(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/npm/index.js                                             //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var Future = Npm.require('fibers/future');                           // 1
                                                                     // 2
Meteor.require = function(moduleName) {                              // 3
  var module = Npm.require(moduleName);                              // 4
  return module;                                                     // 5
};                                                                   // 6
                                                                     // 7
Meteor.sync = function(asynFunction) {                               // 8
  var future = new Future();                                         // 9
  var sent = false;                                                  // 10
  var payload;                                                       // 11
                                                                     // 12
  setTimeout(function() {                                            // 13
    asynFunction(done);                                              // 14
    function done(err, result) {                                     // 15
      if(!sent) {                                                    // 16
        payload = {                                                  // 17
          result: result,                                            // 18
          error: err                                                 // 19
        };                                                           // 20
                                                                     // 21
        if(future.ret) {                                             // 22
          //for 0.6.4.1 and older                                    // 23
          future.ret();                                              // 24
        } else {                                                     // 25
          //for 0.6.5 and newer                                      // 26
          future.return();                                           // 27
        }                                                            // 28
      }                                                              // 29
    }                                                                // 30
  }, 0);                                                             // 31
                                                                     // 32
  future.wait();                                                     // 33
  sent = true;                                                       // 34
                                                                     // 35
  return payload;                                                    // 36
};                                                                   // 37
                                                                     // 38
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/npm/test.js                                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Tinytest.add('Meteor.sync with done()', function(test) {             // 1
  var output = Meteor.sync(function(done) {                          // 2
    setTimeout(function() {                                          // 3
      done(null, 10001);                                             // 4
    }, 10);                                                          // 5
  });                                                                // 6
                                                                     // 7
  test.equal(output.result, 10001);                                  // 8
  test.equal(output.error, null);                                    // 9
});                                                                  // 10
                                                                     // 11
Tinytest.add('Meteor.sync with error()', function(test) {            // 12
                                                                     // 13
  var output = Meteor.sync(function(done) {                          // 14
    setTimeout(function() {                                          // 15
      done({message: 'error-message', code: 402});                   // 16
    }, 10);                                                          // 17
  });                                                                // 18
                                                                     // 19
  test.equal(output.result, undefined);                              // 20
  test.equal(output.error.code, 402);                                // 21
});                                                                  // 22
///////////////////////////////////////////////////////////////////////

}).call(this);
