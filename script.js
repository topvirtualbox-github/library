const defaultLibrary = [
    book1 = { title: "1984", author: "George Orwell", pages: "328", read: "YES" },
    book2 = { title: "Fahrenheit 451", author: "Ray Bradbury", pages: "256", read: "NO" },
    book3 = { title: "Animal Farm", author: "George Orwell", pages: "112", read: "YES" }
];

let customLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(e) {
    const titleValue = document.querySelector("#title").value;
    const authorValue = document.querySelector("#author").value;
    const pagesValue = document.querySelector("#pages").value;
    const readValue = document.querySelector("#read").value;
    if (titleValue === "" || authorValue === "" || pagesValue === "") return;
    e.preventDefault();
    const newBook = new Book(titleValue, authorValue, pagesValue, readValue);
    customLibrary.push(newBook);

    localStorage.setItem("customLibrary", JSON.stringify(customLibrary));

    document.querySelector("form").reset();
    displayBooks();
}

function displayBooks() {
    const display = document.querySelector(".display");
    while (display.hasChildNodes()) {
        display.removeChild(display.lastChild);
    }
    customLibrary.forEach(book => {
        const newBook = document.createElement("div");
        newBook.dataset.id = customLibrary.indexOf(book);
        newBook.className = "item";
        display.appendChild(newBook);
        const newTitle = document.createElement("div");
        newTitle.textContent = book.title;
        newBook.appendChild(newTitle);
        const newAuthor = document.createElement("div");
        newAuthor.textContent = book.author;
        newBook.appendChild(newAuthor);
        const newPages = document.createElement("div");
        newPages.textContent = book.pages;
        newBook.appendChild(newPages);
        const newReadButton = document.createElement("button");
        newReadButton.className = "button-read";
        if (book.read === "YES") { newReadButton.textContent = "YES"; }
        else { newReadButton.textContent = "NO"; }
        newBook.appendChild(newReadButton);
        newReadButton.addEventListener("click", () => {
            if (customLibrary[newBook.dataset.id].read === "YES") { customLibrary[newBook.dataset.id].read = "NO"; }
            else { customLibrary[newBook.dataset.id].read = "YES"; }
            displayBooks();
        });
        const newDeleteButton = document.createElement("button");
        newDeleteButton.className = "button-delete";
        newDeleteButton.textContent = "X";
        newBook.appendChild(newDeleteButton);
        newDeleteButton.addEventListener("click", () => {
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

getLocalStorage();
displayBooks();

const addButton = document.querySelector(".button-add");
const submitButton = document.querySelector(".button-submit");
const closeButton = document.querySelector(".button-close");
const backgroundForm = document.querySelector(".form-background");

addButton.addEventListener("click", () => {
    backgroundForm.classList.add("form-background-active");
});
submitButton.addEventListener("click", addBook);
closeButton.addEventListener("click", () => {
    backgroundForm.classList.remove("form-background-active");
});
backgroundForm.addEventListener("click", (e) => {
    if (e.target === backgroundForm) { backgroundForm.classList.remove("form-background-active"); }
});