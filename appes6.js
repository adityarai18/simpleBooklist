// Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// ui constructor
class UI {
  // add book to book-list
  addBookToList(book) {
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
  }

  // show Alert
  showAlert(message, className) {
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
  }

  // delete book from list
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  // clear input fields
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

    // add book to local storage
    Store.addBook(book);

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

  // remove from ls
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show delete Alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
