const name_input = document.getElementById("name");
const description_input = document.getElementById("description");
const form = document.getElementById("form");
const booksContainer = document.getElementById("books-container");

let books = [];
if (localStorage.getItem("books-colection") !== null) {
    books = JSON.parse(localStorage.getItem("books-colection"))
}

const addBook = (name, desc) => {
  const ids = books.map((book) => book.id);
  const maxId = Math.max(...ids);
  const newBook = {
    id: maxId + 1,
    name: name,
    description: desc,
  };
  books.push(newBook);
};

const removeBook = (id) => {
  const remove = books.findIndex((book) => book.id === id);
  books.splice(remove, 1);
  localStorage.setItem('books-colection', JSON.stringify(books));
};

let innerBooks = "";

function renderBooks() {
    let innerBooks = "";
  books.forEach( book => {
    innerBooks += `
    <div class="book-card">
      <h2 class="title">${book.name}</h2>
      <h3 class="author">${book.description}</h3>
      <button id="remove-btn" onclick="removeBook(${book.id}), renderBooks()">REMOVE</button>
    </div>
    `;
  });

  booksContainer.innerHTML = innerBooks;
}

renderBooks();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBook(name_input.value, description_input.value)
    name_input.value = '';
    description_input.value = '';
    localStorage.setItem('books-colection', JSON.stringify(books))
    renderBooks();
});

// Here we render the books when reload