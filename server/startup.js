Meteor.startup(function () {
  // code to run on server at startup

  // Add details about login services if not already there
  // Note these are for an app running on localhost; we'll need to change
  // them for deployment
  /*if (!Accounts.loginServiceConfiguration.findOne({service: 'google'})) {
    Accounts.loginServiceConfiguration.insert({
      service: 'google',
      clientId: '74664641477.apps.googleusercontent.com',
      secret : 'giJls9204uwHUwYgAuXoGR8-',
      _id : 'cECfzjat4CArnLMhw'
    });
  }*/

  if (!Accounts.loginServiceConfiguration.findOne({service: 'facebook'})) {
    Accounts.loginServiceConfiguration.insert({
      service: 'facebook',
      appId : '227251324090788',
      secret : '3b30264f85ca3df3b742d28c092d52e8',
      _id : '8MtnYh9MiJdCdvgEd'
    });
  }
});

/* These are Tessa's Amazon settings */
var APAC = Meteor.require('apac-g');
var OperationHelper = APAC.OperationHelper;
var opHelper = new OperationHelper({
  awsId: 'AKIAJSVFKF2LYL3NCQ3Q',
  awsSecret: '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',
  assocId: 'scfisw-20'
});

/* Define a getByISBN method that can be called client-side */
Meteor.methods({
  'getByISBN': function(isbn) {
    var response = Meteor.sync(function(done) {
      try {
        opHelper.execute('ItemLookup', {
          'SearchIndex': 'Books',
          'IdType': 'ISBN',
          'ItemId': isbn,
          'ResponseGroup': 'Large'
          }, function(error, results) {
            if (error) console.log('Error in Amazon query:', error);
            console.log('Results from Amazon:', results);
            console.log('Results.Items:', results.ItemLookupResponse.Items);
            done(error, results);
          });
      } catch (err) {
        console.log('Error calling opHelper.execute:', err);
      }
    });

    return response.result;
  }
});
