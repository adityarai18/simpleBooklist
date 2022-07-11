// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// ui constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');

  // create tr element
  const row = document.createElement('tr');
  row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a style="color:black; text-decoration:none" href='#' class='delete'>X</a></td>
  `;
  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // create div
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));

  // add div to dom
  const alertContainer = document.querySelector('#alert-contain');
  alertContainer.appendChild(div);

  // // another method to add alert to dom
  // const container = document.querySelector('.container');
  // // get form
  // const form = document.querySelector('#book-form');
  // // insert Alert
  // container.insertBefore(div, form);

  // timeout after 3 sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

// delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  // validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please  fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // show suvccess alert
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// el for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  // show delete Alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
