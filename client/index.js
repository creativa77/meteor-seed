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
  return Books.findOne(Session.get('currentBookId'));
};
