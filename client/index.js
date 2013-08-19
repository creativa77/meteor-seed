// Define views and templates in the application here

Template.bookshelf.books = function() {
  return Books.find({owner: Meteor.userId()}).fetch();
};
Template.bookshelf.events({
  'click .add-book': function() {
    Meteor.Router.to('/books/new');
  }
});

Template.book.events({
  'mouseup tr': function() {
    Meteor.Router.to('/books/'+this._id);
  }
});

Template.book_update.book = function() {
  return Session.get('currentBook');
};

function updateNotEmpty(field, map) {
  if($('#bookInput_'+field).val()) {
    map[field] = $('#bookInput_'+field).val();
  }
}

Template.book_update.events({
  'click .submit': function(ev) {
    ev.preventDefault();
    var book = Session.get('currentBook');
    updateNotEmpty('title', book);
    updateNotEmpty('authors', book);
    if(book._id) {
      Books.update(book._id, book);
    } else {
      book.owner = Meteor.userId();
      Books.insert(book);
    }
    Meteor.Router.to('/bookshelf');
  },
  'click .cancel': function(ev) {
    ev.preventDefault();
    Meteor.Router.to('/bookshelf');
  },
  'click .delete': function(ev) {
    ev.preventDefault();
    var book = Session.get('currentBook');
    if(confirm("Are you sure you want to delete '" + book.title + "' from the database?")) {
      Books.remove(book._id);
    }
    Meteor.Router.to('/bookshelf');
  }
 });
