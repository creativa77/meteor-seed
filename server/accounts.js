Accounts.onCreateUser(function(options, user) {
  console.log(user);
  user.profile = options.profile || {};
  user.profile.email = user.services.persona.email;
  user.username = user.profile.email;
  user.email = user.profile.email;
  return user;
});
