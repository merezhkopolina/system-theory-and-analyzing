class BookStateManager {
    constructor(book) {
        this.book = book;
        this.state = 'AVAILABLE';
        this.waitingList = [];
    }

    reserve(member) {
        switch (this.state) {
            case 'AVAILABLE':
                this.state = 'RESERVED';
                this.book.currentHolder = member;
                return true;
            default:
                this.waitingList.push(member);
                return false;
        }
    }

    checkOut() {
        if (this.state === 'RESERVED') {
            this.state = 'CHECKED_OUT';
            this.book.isAvailable = false;
            this.book.dueDate = new Date();
            this.book.dueDate.setDate(this.book.dueDate.getDate() + 14);
            return true;
        }
        return false;
    }

    return() {
        if (this.state === 'CHECKED_OUT' || this.state === 'OVERDUE') {
            this.state = 'AVAILABLE';
            this.book.isAvailable = true;
            this.book.currentHolder = null;
            this.book.dueDate = null;
            
            // Перевірка списку очікування
            if (this.waitingList.length > 0) {
                const nextMember = this.waitingList.shift();
                this.reserve(nextMember);
            }
            return true;
        }
        return false;
    }

    checkStatus() {
        if (this.state === 'CHECKED_OUT' && this.book.dueDate < new Date()) {
            this.state = 'OVERDUE';
        }
        return this.state;
    }
}

// Приклад використання
const demonstrateLibrarySystem = () => {
    // Створення бібліотеки
    const library = new Library();

    // Додавання книги
    const book = new Book('1984', 'George Orwell', '978-0451524935');
    library.addBook(book);

    // Створення читача
    const member = new Member('John Doe', 'M001');
    library.members.push(member);

    // Процес замовлення
    BookOrderProcessor.processBookOrder(library, '978-0451524935', 'M001')
        .then(result => console.log('Результат замовлення:', result));

    // Управління станом книги
    const stateManager = new BookStateManager(book);
    stateManager.reserve(member);
    stateManager.checkOut();
    console.log('Стан книги:', stateManager.checkStatus());
};