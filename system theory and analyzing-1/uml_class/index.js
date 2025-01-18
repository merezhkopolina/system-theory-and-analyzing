class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isAvailable = true;
        this.currentHolder = null;
        this.dueDate = null;
    }

    checkOut(member) {
        if (this.isAvailable) {
            this.isAvailable = false;
            this.currentHolder = member;
            this.dueDate = new Date();
            this.dueDate.setDate(this.dueDate.getDate() + 14); // 2 неділі позики
            return true;
        }
        return false;
    }

    returnBook() {
        this.isAvailable = true;
        this.currentHolder = null;
        this.dueDate = null;
    }
}

class Member {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (book.checkOut(this)) {
            this.borrowedBooks.push(book);
            return true;
        }
        return false;
    }

    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.returnBook();
            this.borrowedBooks.splice(index, 1);
            return true;
        }
        return false;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(ISBN) {
        this.books = this.books.filter(book => book.ISBN !== ISBN);
    }

    findBook(ISBN) {
        return this.books.find(book => book.ISBN === ISBN);
    }
}