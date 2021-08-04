let myLibrary = [
    book1 = { title: "1984", author: "George Orwell", pages: "328" },
    book2 = { title: "Fahrenheit 451", author: "Ray Bradbury", pages: "256" },
    book3 = { title: "Animal Farm", author: "George Orwell", pages: "112" }
];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBook(e) {
    const titleValue = document.getElementById("title").value;
    const authorValue = document.getElementById("author").value;
    const pagesValue = document.getElementById("pages").value;
    if (titleValue === "" || authorValue === "" || pagesValue === "") return;
    e.preventDefault();
    const newBook = new Book(titleValue, authorValue, pagesValue);
    myLibrary.push(newBook);
    document.querySelector("form").reset();
    clearBooks();
    displayBooks();
}

document.getElementById("submit").addEventListener("click", addBook);

function displayBooks() {
    myLibrary.forEach(book => {
        const library = document.querySelector(".library");
        const newBook = document.createElement("div");
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
    });
}

function clearBooks() {
    const library = document.querySelector(".library");
    while (library.hasChildNodes()) {
        library.removeChild(library.lastChild);
    }
}

displayBooks();