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
