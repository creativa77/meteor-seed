// Define views and templates in the application here

Template.books.books = function() {
  return Books.find().fetch();
};

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
    Books.update(book._id, book);
    Meteor.Router.to('/books');
  },
  'click .cancel': function(ev) {
    ev.preventDefault();
    Meteor.Router.to('/books');
  }
});
