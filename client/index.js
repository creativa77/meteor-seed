// Define views and templates in the application here

Template.books.books = function() {
  return Books.find().fetch();
};

Template.book.events({
  'mouseup tr': function() { console.log('clicked book: ' + this.title); }
});
