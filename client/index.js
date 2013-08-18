// Define views and templates in the application here

Template.books.books = function() {
  return Books.find().fetch();
};
