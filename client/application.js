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
    // Render the 'book_update' template
    return 'book_update';
  }

});

/* If you are not logged in, show the signin page */
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

// Used for the navbar to render the current tab differently
Handlebars.registerHelper('TabClassName', function(route) {
  return (Meteor.Router.page() == route) ? 'active' : '';
});
