// Define your main application here

// Subscribe to collections

// This subscription populates Meteor.users with all users published by the server
Meteor.subscribe('users');

Meteor.Router.add({
  '/bookshelf': 'bookshelf',
  '/books': 'books',
  '/people': 'people',

  '/books/:id': function(id) {
    console.log('The router is at path:', this.canonicalPath);
    console.log('Parameters:', this.params);

    Session.set('currentBookId', id);
    // I believe this will render the 'book' template
    return 'book_update';
  }

});

Meteor.Router.filters({
  'checkLoggedIn': function(page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    } else if (Meteor.user()) {
      return page;
    } else {
      return 'signin';
    }
  }
});

Meteor.Router.filter('checkLoggedIn');
