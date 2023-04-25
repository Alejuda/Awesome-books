const name_input = document.getElementById("name");
const description_input = document.getElementById("description");
const form = document.getElementById("form");
const booksContainer = document.getElementById("books-container");

//creation of the Book List
class BookList extends Array{
  
  addBook(newBook) {
    books.push(newBook);
    renderBooks();
  }

  removeBook(id) {
    const remove = books.findIndex((book) => book.id === id);
    books.splice(remove, 1);
    localStorage.setItem("books-colection", JSON.stringify(books));
  }
}

class Book {
  constructor(title, author) {
    if (author === '') {
      author = 'Unknown Author';
    }
    let newId = 0;
    let maxId;
    const ids = books.map((book) => book.id);

    if (ids.length !== 0) {
      maxId = Math.max(...ids);
      newId = maxId + 1;
    }

    this.id = newId
    this.title = title;
    this.author = author;
  }
}

let books = new BookList();

if (localStorage.getItem("books-colection") !== null) {
  let localStorageContent = localStorage.getItem("books-colection");
  books = new BookList (... JSON.parse(localStorageContent));
}

function renderBooks() {
  let innerBooks = "";
  if (books.length === 0) {
    innerBooks = '<h3 class="books-placeholder">You do not have any books yet. Add one below!</h3>'
  } else {
    books.forEach((book, idx) => {
      let odd = "row-odd";
      if (idx % 2 !== 0) {
        odd = "row-even";
      }
      innerBooks += `
      <div class="book-card ${odd}">
        <h2 class="book-title">"${book.title}"</h2>
        <p class="book-author">By ${book.author}</p>
        <button class="remove-btn" id="remove-btn" onclick="books.removeBook(${book.id}), renderBooks()">Remove</button>
      </div>
      `;
    });
  }
  booksContainer.innerHTML = innerBooks;
}
renderBooks();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newBook = new Book(name_input.value, description_input.value);
  books.addBook(newBook);
  localStorage.setItem("books-colection", JSON.stringify(books));
  name_input.value = '';
  description_input.value = '';
  renderBooks();
});
