
// Variables
let allReviews = [];
const params      = new URLSearchParams(window.location.search);
const bookId      = params.get('id');
const detailDiv   = document.getElementById('book-detail');
const reviewsDiv  = document.getElementById('reviews-list');
const form        = document.getElementById('review-form');
const successMsg  = document.getElementById('form-success');

// Affiche les infos du livre
function displayBookDetail(book) {

    const row     = document.createElement('div');
    const colImg  = document.createElement('div');
    const colInfo = document.createElement('div');
    const img     = document.createElement('img');
    const titre   = document.createElement('h2');
    const auteur  = document.createElement('p');
    const desc    = document.createElement('p');
    const note    = document.createElement('p');
    const strong  = document.createElement('strong');

    row.classList.add('row');
    colImg.classList.add('col-md-4');
    colInfo.classList.add('col-md-8');

    img.src       = book.image;
    img.alt       = book.title;
    img.classList.add('img-fluid', 'rounded');

    titre.textContent  = book.title;
    auteur.classList.add('text-muted');
    auteur.textContent = 'par ' + book.author;
    desc.textContent   = book.description;
    strong.textContent = 'Note moyenne : ⭐ ' + book.rating.toFixed(1);
    note.appendChild(strong);

    colImg.appendChild(img);
    colInfo.appendChild(titre);
    colInfo.appendChild(auteur);
    colInfo.appendChild(desc);
    colInfo.appendChild(note);
    row.appendChild(colImg);
    row.appendChild(colInfo);
    detailDiv.appendChild(row);
}

// Affiche les commentaires du livre
function displayReviews() {

    // Vider la liste
    while (reviewsDiv.firstChild) {
        reviewsDiv.removeChild(reviewsDiv.firstChild);
    }

    const bookReviews = allReviews.filter(function(r) {
        return r.bookId == bookId;
    });

    if (bookReviews.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Aucun commentaire pour ce livre.';
        reviewsDiv.appendChild(p);
        return;
    }

    for (const review of bookReviews) {
        const div     = document.createElement('div');
        const strong  = document.createElement('strong');
        const note    = document.createElement('span');
        const comment = document.createElement('p');

        div.classList.add('comment-item');
        strong.textContent  = review.user;
        note.textContent    = ' — ⭐ ' + review.rating + '/5';
        comment.textContent = review.comment;

        div.appendChild(strong);
        div.appendChild(note);
        div.appendChild(comment);
        reviewsDiv.appendChild(div);
    }
}

// Gestion du formulaire
function setupForm() {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const user    = document.getElementById('input-name').value.trim();
        const rating  = parseInt(document.getElementById('input-rating').value);
        const comment = document.getElementById('input-comment').value.trim();

        if (!user || !comment || isNaN(rating)) return;

        const newReview = { bookId: parseInt(bookId), user: user, rating: rating, comment: comment };
        allReviews.push(newReview);

        displayReviews();

        successMsg.style.display = 'block';
        setTimeout(function() { successMsg.style.display = 'none'; }, 3000);

        form.reset();
    });
}

// Charge le livre et les reviews
async function loadBook() {

    if (!bookId) {
        const p = document.createElement('p');
        p.textContent = 'Aucun livre sélectionné.';
        detailDiv.appendChild(p);
        return;
    }

    try {
        const [booksRes, reviewsRes] = await Promise.all([
            fetch('data/books.json'),
            fetch('data/reviews.json')
        ]);

        const books = await booksRes.json();
        allReviews  = await reviewsRes.json();

        const book = books.find(function(b) { return b.id == bookId; });

        if (!book) {
            const p = document.createElement('p');
            p.textContent = 'Livre introuvable.';
            detailDiv.appendChild(p);
            return;
        }

        displayBookDetail(book);
        displayReviews();
        setupForm();

    } catch (error) {
        const p = document.createElement('p');
        p.classList.add('text-danger');
        p.textContent = 'Erreur de chargement.';
        detailDiv.appendChild(p);
        console.error(error);
    }
}

// Lancement au chargement de la page
document.addEventListener('DOMContentLoaded', loadBook);
