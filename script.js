const books = [];
const apiKey = ""; // Replace with your API key if required (e.g., Google Books API)

const addBook = () => {
    const titleInput = document.getElementById('title').value;
    const pagesInput = parseInt(document.getElementById('pages').value);
    const authorInput = document.getElementById('author').value;

    // Validation
    if (titleInput && !isNaN(pagesInput) && pagesInput > 0 && authorInput) {
        const book = {
            title: titleInput,
            pages: pagesInput,
            author: authorInput
        };
        books.push(book);
        document.getElementById('title').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('author').value = '';
        updateStatus();
        fetchBookImage(book.title);
    } else {
        alert('Please fill in all fields correctly (pages must be a positive number).');
    }
};

const fetchBookImage = async (title) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${apiKey}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const book = data.items[0].volumeInfo;
            const imageUrl = book.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image';
            const bookIndex = books.length - 1;
            books[bookIndex].imageUrl = imageUrl;
            showBook();
        }
    } catch (error) {
        console.error('Error fetching book image:', error);
    }
};

const updateStatus = () => {
    const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
    const bookCount = books.length;
    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('bookCount').textContent = bookCount;
};

const showBook = () => {
    const container = document.createElement('div');
    container.id = 'bookList';

    books.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
            <strong>${book.title}</strong><br>
            by ${book.author}<br>
            (${book.pages} pages)<br>
            <img src="${book.imageUrl || 'https://via.placeholder.com/128x192?text=No+Image'}" alt="${book.title} cover">
        `;
        container.appendChild(bookDiv);
    });

    const existingList = document.getElementById('bookList');
    if (existingList) existingList.remove();
    document.querySelector('main').appendChild(container);
};

// Add event listeners to buttons
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    addBook();
});

document.querySelector('button[onclick="showBook()"]').addEventListener('click', showBook);