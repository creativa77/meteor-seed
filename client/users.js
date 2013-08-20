Template.people.users = function() {
  return Meteor.users.find().fetch();
}

Template.user.friendlyname = function() {
  return getFriendlyName(this);
}

Template.user.icon = function() {
  return getIcon(this);
}

Template.user.events({
  'click img': function() {
    console.log('click');
    Meteor.Router.to('/bookshelf/'+this._id);
  }
});
