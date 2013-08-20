// Define views and templates in the application here

Template.bookshelf.books = function() {
  return Books.find({owner: Meteor.userId()}).fetch();
};
Template.bookshelf.events({
  'click .add-book': function() {
    Meteor.Router.to('/books/new');
  }
});

Template.books.books = function() {
  return Books.find().fetch();
};

Template.book.owner = function() {
  return this.owner && getFriendlyName(Meteor.users.findOne(this.owner));
};
Template.book.library = function() {
  return (Meteor.Router.page() == 'books');
};
Template.book.events({
  'mouseup tr': function() {
    if(! Template.book.library()) {
      Meteor.Router.to('/books/'+this._id);
    }
  }
});
Template.book.mailabout = function() {
  var owner = Meteor.users.findOne(this.owner);
  return "mailto:"+owner.profile.email+"?subject="+escape(this.title);
};

Template.book_update.book = function() {
  return Session.get('currentBook');
};

function updateNotEmpty(field, map) {
  if($('#bookInput_'+field).val()) {
    map[field] = $('#bookInput_'+field).val();
  }
}

function updateFromISBN(err, result) {
  if (err) {
    alert(err);
    return;
  }


  var items = result.ItemLookupResponse.Items;
  if (items.length > 0) {
    var item = items[0].Item[0];
    console.log('item:', item);
    Session.set('amazonResult', item);
    $('#bookInput_title').val(item.ItemAttributes[0].Title[0]);
    if (item.ItemAttributes[0].Author) {
      $('#bookInput_authors').val(item.ItemAttributes[0].Author.join(', '));
    } else if (item.ItemAttributes[0].Creator) {
      $('#bookInput_authors').val(_(item.ItemAttributes[0].Creator).
        pluck('_').join(', '));
    }
    $('#bookImage').attr('src', item.MediumImage[0].URL[0]);
  }
}

Template.book_update.events({
  'click .submit': function(ev) {
    ev.preventDefault();
    var book = Session.get('currentBook');
    var amazonData = Session.get('amazonResult');

    updateNotEmpty('title', book);
    updateNotEmpty('authors', book);
    if (amazonData) {
      book['imageURL'] = amazonData.MediumImage[0].URL[0];
    }

    // If it's an existing book, update it only
    if(book._id) {
      Books.update(book._id, book);

    // If it's a new book, insert it
    } else {
      // Add a pointer to the owner of the book
      book.owner = Meteor.userId();
      Books.insert(book);
    }
    Meteor.Router.to('/bookshelf');
  },
  'click .lookup': function(ev) {
    ev.preventDefault();
    var isbn = $('#bookInput_isbn').val();
    getByISBN(isbn, updateFromISBN);

    $('#bookInput_title').attr('disabled', 'disabled');
    $('#bookInput_authors').attr('disabled', 'disabled');
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
  },
  'click .recall': function(ev) {
    ev.preventDefault();
    var book = Session.get('currentBook');
    if(confirm("Are you sure you want to recall '" + book.title + "'? Have you received it back?")) {
      book.borrower = undefined;
      book.notes = undefined;
      Books.update(book._id, book);
    }
    Meteor.Router.to('/bookshelf');
  },
  'click .lend': function(ev) {
    ev.preventDefault();
    Meteor.Router.to('/books/'+Session.get('currentBook')._id+'/lend');
  }
});

Template.lend.book = function() {
  return Session.get('currentBook');
};
Template.lend.rendered = function() {
  $('#lendInput_borrower').typeahead({
    source: Meteor.users.find().fetch().map(function(user) {
      return getFriendlyName(user);
    })
  });
};
Template.lend.events({
  'click .submit': function(ev) {
    ev.preventDefault();
    var book = Session.get('currentBook');
    book.borrower = $('#lendInput_borrower').val();
    book.borrowed_on = (new Date()).getTime();
    book.notes = $('#lendInput_notes').val();
    Books.update(book._id, book);
    Meteor.Router.to('/bookshelf');
  },
  'click .cancel': function(ev) {
    ev.preventDefault();
    Meteor.Router.to('/bookshelf');
  }
});

