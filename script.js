let myLibrary = [
    book1 = { title: "1984", author: "George Orwell", pages: "328" },
    book2 = { title: "Fahrenheit 451", author: "Ray Bradbury", pages: "256" },
    book3 = { title: "Animal Farm", author: "George Orwell", pages: "112" }
];

displayBooks();

document.querySelector("#submit-button").addEventListener("click", addBook);

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBook(e) {
    const titleValue = document.querySelector("#title").value;
    const authorValue = document.querySelector("#author").value;
    const pagesValue = document.querySelector("#pages").value;
    if (titleValue === "" || authorValue === "" || pagesValue === "") return;
    e.preventDefault();
    const newBook = new Book(titleValue, authorValue, pagesValue);
    myLibrary.push(newBook);
    document.querySelector("form").reset();
    displayBooks();
}

function displayBooks() {
    const library = document.querySelector(".library");
    while (library.hasChildNodes()) {
        library.removeChild(library.lastChild);
    }
    myLibrary.forEach(book => {
        const newBook = document.createElement("div");
        newBook.dataset.id = myLibrary.indexOf(book);
        newBook.className = "book";
        library.appendChild(newBook);
        const newTitle = document.createElement("div");
        newTitle.className = "item";
        newTitle.textContent = book.title;
        newBook.appendChild(newTitle);
        const newAuthor = document.createElement("div");
        newAuthor.className = "item";
        newAuthor.textContent = book.author;
        newBook.appendChild(newAuthor);
        const newPages = document.createElement("div");
        newPages.className = "item";
        newPages.textContent = book.pages;
        newBook.appendChild(newPages);
        const newRemoveButton = document.createElement("button");
        newRemoveButton.className = "remove-button";
        newRemoveButton.textContent = "X";
        newBook.appendChild(newRemoveButton);
        newRemoveButton.addEventListener("click", () => {
            myLibrary.splice(newBook.dataset.id, 1);
            displayBooks();
        });
    });
}