Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};
  user.profile.email = user.services.facebook.email;
  return user;
});
