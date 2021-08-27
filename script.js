const defaultLibrary = [
    book1 = { title: "1984", author: "George Orwell", pages: "328", read: "NO" },
    book2 = { title: "Brave New World", author: "Aldous Huxley", pages: "311", read: "NO" },
    book3 = { title: "Fahrenheit 451", author: "Ray Bradbury", pages: "256", read: "NO" },
    book4 = { title: "Animal Farm", author: "George Orwell", pages: "112", read: "NO" },
    book5 = { title: "The Handmaid's Tale", author: "Margaret Atwood", pages: "311", read: "NO" }
];

let customLibrary = [];

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBook(e) {
    const titleValue = document.querySelector("#title").value;
    const authorValue = document.querySelector("#author").value;
    const pagesValue = document.querySelector("#pages").value;
    const readValue = document.querySelector("#read").value;
    if (titleValue === "" || authorValue === "" || pagesValue === "" || pagesValue < 0) return;
    e.preventDefault();
    const newBook = new Book(titleValue, authorValue, pagesValue, readValue);
    customLibrary.push(newBook);
    saveLocalStorage();
    displayBooks();
    document.querySelector("form").reset();
}

function displayBooks() {
    const library = document.querySelector(".library");
    while (library.hasChildNodes()) { library.removeChild(library.lastChild); }
    customLibrary.forEach(book => {

        const newBook = document.createElement("div");
        newBook.dataset.id = customLibrary.indexOf(book);
        newBook.classList.add("book");
        library.appendChild(newBook);

        const newTitle = document.createElement("span");
        newTitle.textContent = book.title;

        const newAuthor = document.createElement("span");
        newAuthor.textContent = book.author;

        const newPages = document.createElement("span");
        newPages.textContent = book.pages;

        const newReadButton = document.createElement("button");
        newReadButton.classList.add("btn", "btn-read");
        if (book.read === "YES") { newReadButton.textContent = "YES"; }
        else { newReadButton.textContent = "NO"; }

        const newRemoveButton = document.createElement("button");
        newRemoveButton.classList.add("btn", "btn-remove");
        newRemoveButton.textContent = "X";

        newBook.append(newTitle, newAuthor, newPages, newReadButton, newRemoveButton);

        newReadButton.addEventListener("click", () => {
            if (customLibrary[newBook.dataset.id].read === "YES") { customLibrary[newBook.dataset.id].read = "NO"; }
            else { customLibrary[newBook.dataset.id].read = "YES"; }
            saveLocalStorage();
            displayBooks();
        });
        
        newRemoveButton.addEventListener("click", () => {
            customLibrary.splice(newBook.dataset.id, 1);
            saveLocalStorage();
            displayBooks();
        });
    });
}

function saveLocalStorage() {
    localStorage.setItem("customLibrary", JSON.stringify(customLibrary));
}

function getLocalStorage() {
    const storage = localStorage.getItem("customLibrary");
    if (!storage || storage === "[]") {
        customLibrary = defaultLibrary;
    } else {
        customLibrary = JSON.parse(localStorage.getItem("customLibrary"));
    }
}

const openButton = document.querySelector(".btn-open");
const submitButton = document.querySelector(".btn-submit");
const closeButton = document.querySelector(".btn-close");
const backgroundForm = document.querySelector(".form-background");

openButton.addEventListener("click", () => {
    backgroundForm.classList.toggle("form-background-active");
});
submitButton.addEventListener("click", addBook);
closeButton.addEventListener("click", () => {
    backgroundForm.classList.toggle("form-background-active");
});
backgroundForm.addEventListener("click", (e) => {
    if (e.target === backgroundForm) { backgroundForm.classList.toggle("form-background-active"); }
});

getLocalStorage();
displayBooks();