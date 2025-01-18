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