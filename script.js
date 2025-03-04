const books = [];
const apiKey = "";

const addBook = () => {
    const  title = document.getElementById('title');
    const pages = document.getElementById('pages');
    const author = document.getElementById('author');

    if (title && pages > 0) {
        books.push(title);
    }
}

const updateStatus = () => {
    const totalPages = document.getElementById('totalPages');
    const bookCount = document.getElementById('bookCount');

    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('bookCount').textContent = bookCount;
}

const showBook = () => {

}