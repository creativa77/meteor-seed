Meteor.startup(function () {
  // code to run on server at startup

  // Add details about login services if not already there
  // Note these are for an app running on localhost; we'll need to change
  // them for deployment
  if (!Accounts.loginServiceConfiguration.findOne({service: 'google'})) {
    Accounts.loginServiceConfiguration.insert({
      service: 'google',
      clientId: '74664641477.apps.googleusercontent.com',
      secret : 'giJls9204uwHUwYgAuXoGR8-',
      _id : 'cECfzjat4CArnLMhw'
    });
  }

  if (!Accounts.loginServiceConfiguration.findOne({service: 'facebook'})) {
    Accounts.loginServiceConfiguration.insert({
      service: 'facebook',
      appId : '227251324090788',
      secret : '3b30264f85ca3df3b742d28c092d52e8',
      _id : '8MtnYh9MiJdCdvgEd'
    });
  }
});
