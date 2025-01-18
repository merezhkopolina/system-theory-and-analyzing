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
            this.dueDate.setDate(this.dueDate.getDate() + 14);
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