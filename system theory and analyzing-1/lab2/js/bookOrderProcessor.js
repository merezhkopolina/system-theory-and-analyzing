class BookOrderProcessor {
    constructor() {
        this.waitingList = new Map();
    }

    async processBookOrder(library, ISBN, memberId) {
        try {
            const book = library.findBook(ISBN);
            if (!book) {
                throw new Error('Книгу не знайдено');
            }

            const member = library.members.find(m => m.id === memberId);
            if (!member) {
                throw new Error('Читача не знайдено');
            }

            if (book.isAvailable) {
                const result = member.borrowBook(book);
                if (result) {
                    this.notifySuccess(member, book);
                    return {
                        status: 'success',
                        message: 'Книгу успішно видано',
                        dueDate: book.dueDate
                    };
                }
            } else {
                this.addToWaitingList(book, member);
                return {
                    status: 'waiting',
                    message: 'Книга не доступна, додано в список очікування'
                };
            }
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    addToWaitingList(book, member) {
        if (!this.waitingList.has(book.ISBN)) {
            this.waitingList.set(book.ISBN, []);
        }
        this.waitingList.get(book.ISBN).push(member);
    }

    notifySuccess(member, book) {
        console.log(`Книгу "${book.title}" видано читачу ${member.name}`);
    }
}