# 📚 Blog de Livres

A front-end web application built as part of **TP2 — LST GI Architecture N-tier & Web Development**  
**FST Settat | Pr. C. AZROUMAHLI | 2025-2026**

---

## 📋 Description

A book blog that allows users to:
- Browse a catalogue of books
- View details of each book
- Read comments from other users
- Add a rating and a comment

---

## 🗂️ Project Structure

```
tp2/
├── index.html          → Page 1 : Book catalogue
├── book.html           → Page 2 : Book details
├── css/
│   └── style.css       → Custom styles + responsive design
├── js/
│   ├── app.js          → Catalogue logic (load + display books)
│   └── book.js         → Detail page logic (book info + reviews + form)
└── data/
    ├── books.json      → Books data
    └── reviews.json    → Reviews data
```

---

## 🛠️ Technologies Used

| Technology   | Purpose                        |
|--------------|--------------------------------|
| HTML5        | Page structure                 |
| CSS3         | Styling and animations         |
| Bootstrap 5  | Responsive grid and components |
| JavaScript   | DOM manipulation, events       |
| Fetch API    | Load JSON data asynchronously  |
| Google Fonts | Playfair Display + Poppins     |

---

## ⚙️ Key JavaScript Concepts Used

- `async / await` — asynchronous data loading
- `fetch()` — load JSON files
- `try / catch` — error handling
- `createElement` / `appendChild` — DOM manipulation
- `classList.add()` — adding CSS classes
- `addEventListener()` — handling click and submit events
- `URLSearchParams` — reading URL parameters
- `Array.find()` / `Array.filter()` — searching data
- `event.preventDefault()` — prevent form reload

---

## 🚀 How to Run

> ⚠️ The project uses `fetch()` to load JSON files.  
> You **must** use a local server — opening `index.html` directly will not work.

### Option 1 — VS Code Live Server ✅ (recommended)
1. Install the **Live Server** extension in VS Code
2. Right-click on `index.html` → **Open with Live Server**
3. The app opens at `http://127.0.0.1:5500`

### Option 2 — Python
```bash
cd tp2
python -m http.server
```
Then open `http://localhost:8000` in your browser.

---

## 📄 Pages

### Page 1 — Book Catalogue (`index.html`)
- Loads books from `data/books.json`
- Displays a Bootstrap grid of cards (3 per row)
- Each card shows: cover image, title, author, rating, and a "Voir Détails" button

### Page 2 — Book Details (`book.html`)
- Gets the book `id` from the URL using `URLSearchParams`
- Displays: image, title, author, description, average rating
- Shows existing comments filtered by book
- Form to add a new name, rating (1–5), and comment

---

## 📦 Data Format

### books.json
```json
{
  "id": 1,
  "title": "JavaScript Guide",
  "author": "John Doe",
  "image": "https://...",
  "description": "...",
  "rating": 4.2,
  "genre": "Programmation"
}
```

### reviews.json
```json
{
  "bookId": 1,
  "user": "Ali",
  "rating": 5,
  "comment": "Excellent livre !"
}
```

---

## ✅ TP Checklist

- [x] Page 1 : Book catalogue with Bootstrap grid
- [x] Page 2 : Book detail page
- [x] Load data with `fetch()` and `async/await`
- [x] Dynamic DOM manipulation with `createElement`
- [x] Click event on "Voir Détails" button
- [x] Display reviews filtered by book
- [x] Add review form with `event.preventDefault()`
- [x] Responsive design with Bootstrap + media queries
- [x] CSS hover effects with `transform` and `box-shadow`

---

## 👨‍🎓 Author

**Student project — LST GI**  
FST Settat — 2025/2026
