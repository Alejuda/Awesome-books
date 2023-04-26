const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const form = document.getElementById('form');
const booksContainer = document.getElementById('books-container');
const contactContainer = document.getElementById('contact-container');
const sectionTitle = document.getElementById('section-title');
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');
const dateNow = document.getElementById('today-date');

// creation of the Book List
class BookList extends Array {
  addBook(newBook) {
    this.push(newBook);
    renderBooks();
  }

  removeBook(id) {
    const remove = this.findIndex((book) => book.id === id);
    this.splice(remove, 1);
    localStorage.setItem('books-colection', JSON.stringify(books));
  }
}

class Book {
  constructor(title, author) {
    if (author === '') {
      author = 'Unknown Author';
    }
    let newId = 0;
    let maxId = -1;
    if (books.length > 0) {
      maxId = books[books.length - 1].id;
    }
    newId = maxId + 1;

    this.id = newId;
    this.title = title;
    this.author = author;
  }
}

function renderBooks() {
  let innerBooks = '';
  if (books.length === 0) {
    innerBooks = '<h3 class="books-placeholder">You do not have any books yet. Add one below!</h3>';
  } else {
    books.forEach((book, idx) => {
      let odd = 'row-odd';
      if (idx % 2 !== 0) {
        odd = 'row-even';
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

let books = new BookList();

if (localStorage.getItem('books-colection') !== null) {
  const localStorageContent = localStorage.getItem('books-colection');
  books = new BookList(...JSON.parse(localStorageContent));
}

renderBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBook = new Book(nameInput.value, descriptionInput.value);
  books.addBook(newBook);
  localStorage.setItem('books-colection', JSON.stringify(books));
  nameInput.value = '';
  descriptionInput.value = '';
  renderBooks();
});

listLink.addEventListener('click', () => {
  if (!booksContainer.classList.contains('show')) {
    booksContainer.classList.add('show');
    form.classList.remove('show');
    contactContainer.classList.remove('show');
    sectionTitle.innerText = 'All Awesome Books';
    listLink.classList.add('active');
    addLink.classList.remove('active');
    contactLink.classList.remove('active');
  }
});

addLink.addEventListener('click', () => {
  if (!form.classList.contains('show')) {
    booksContainer.classList.remove('show');
    form.classList.add('show');
    contactContainer.classList.remove('show');
    sectionTitle.innerText = 'Add a new book';
    listLink.classList.remove('active');
    addLink.classList.add('active');
    contactLink.classList.remove('active');
  }
});

contactLink.addEventListener('click', () => {
  if (!contactContainer.classList.contains('show')) {
    booksContainer.classList.remove('show');
    form.classList.remove('show');
    contactContainer.classList.add('show');
    sectionTitle.innerText = 'Contact Information';
    listLink.classList.remove('active');
    addLink.classList.remove('active');
    contactLink.classList.add('active');
  }
});

let date;
function updateDate() {
  date = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: 'true',
  });
  dateNow.innerText = date;
}

setInterval(updateDate, 1000);
