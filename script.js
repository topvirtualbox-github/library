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
}

document.getElementById("submit").addEventListener("click", addBook);