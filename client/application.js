// Define your main application here

// Subscribe to collections

// This subscription populates Meteor.users with all users published by the server
Meteor.subscribe('users');

Meteor.Router.add({
  '/': 'books',
  '/bookshelf': 'bookshelf',
  '/books': 'books',
  '/people': 'people',

  '/books/:id': function(id) {
    /*
    console.log('The router is at path:', this.canonicalPath);
    console.log('Parameters:', this.params);
    */
    var book;
    if(id == 'new') {
      book = {};
    } else {
      book = Books.findOne(id);
    }
    Session.set('currentBook', book);
    return 'book_update';
  },
  '/books/:id/lend': function(id) {
    Session.set('currentBook', Books.findOne(id));
    return 'lend';
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

getByISBN = function getByISBN(isbn, callback) {
  Meteor.call('getByISBN', isbn, callback);
};
