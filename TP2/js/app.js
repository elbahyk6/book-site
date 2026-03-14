// Variables
let allBooks = [];
const bookList = document.getElementById('book-list');

function createBookCard(book) {
    const col      = document.createElement('div');
    const card     = document.createElement('div');
    const img      = document.createElement('img');
    const cardBody = document.createElement('div');
    const titre    = document.createElement('h5');
    const auteur   = document.createElement('p');
    const note     = document.createElement('p');
    const btn      = document.createElement('button');

    col.classList.add('col-md-4', 'mb-4');
    card.classList.add('card', 'h-100');
    img.src     = book.image;
    img.alt     = book.title;
    img.classList.add('card-img-top');
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/300x200?text=Livre';
    };
    cardBody.classList.add('card-body', 'd-flex', 'flex-column');
    titre.classList.add('card-title');
    titre.textContent  = book.title;
    auteur.classList.add('card-text', 'text-muted');
    auteur.textContent = 'par ' + book.author;
    note.classList.add('card-text');
    note.textContent   = '⭐ ' + book.rating.toFixed(1);
    btn.classList.add('btn', 'btn-primary', 'mt-auto');
    btn.textContent    = 'Voir Détails';

    btn.addEventListener('click', function() {
        window.location = 'book.html?id=' + book.id;
    });

    cardBody.appendChild(titre);
    cardBody.appendChild(auteur);
    cardBody.appendChild(note);
    cardBody.appendChild(btn);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

function displayBooks(books) {
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }

    if (books.length === 0) {
        const p = document.createElement('p');
        p.classList.add('text-danger');
        p.textContent = 'Aucun livre trouvé.';
        bookList.appendChild(p);
        return;
    }

    for (const book of books) {
        bookList.appendChild(createBookCard(book));
    }
}

async function loadBooks() {
    try {
        const response = await fetch('data/books.json');

        if (!response.ok) {
            throw new Error('Erreur : ' + response.status);
        }

        allBooks = await response.json();
        displayBooks(allBooks);

    } catch (error) {
        const p = document.createElement('p');
        p.classList.add('text-danger');   // ✅ corrigé : add() au lieu de =
        p.textContent = 'Impossible de charger les livres.';
        bookList.appendChild(p);
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', loadBooks);