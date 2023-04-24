const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const form = document.getElementById("form");
const booksContainer = document.getElementById("books-container");

let books = [];
if (localStorage.getItem("books-colection") !== null) {
  books = JSON.parse(localStorage.getItem("books-colection"));
}

const addBook = (name, desc) => {
  let newBook = {};
  let newId = 0;
  let maxId;
  const ids = books.map((book) => book.id);

  if (ids.length !== 0) {
    maxId = Math.max(...ids);
    newId = maxId + 1;
  }

  newBook = {
    id: newId,
    name: name,
    description: desc,
  };

  books.push(newBook);
};

const removeBook = (id) => {
  const remove = books.findIndex((book) => book.id === id);
  books.splice(remove, 1);
  localStorage.setItem("books-colection", JSON.stringify(books));
};

const innerBooks = "";

function renderBooks() {
  let innerBooks = "";
  books.forEach((book) => {
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook(nameInput.value, descriptionInput.value);
  nameInput.value = "";
  descriptionInput.value = "";
  localStorage.setItem("books-colection", JSON.stringify(books));
  renderBooks();
});
