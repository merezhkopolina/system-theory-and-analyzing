
class BookOrderProcessor {
    static async processBookOrder(library, ISBN, memberId) {
        try {
            // Пошук книги
            const book = library.findBook(ISBN);
            if (!book) {
                throw new Error('Книгу не знайдено');
            }

            // Перевірка доступності
            if (book.isAvailable) {
                // Оформлення замовлення
                const member = library.members.find(m => m.id === memberId);
                if (!member) {
                    throw new Error('Читача не знайдено');
                }

                // Видача книги
                if (member.borrowBook(book)) {
                    return {
                        status: 'success',
                        message: 'Книгу успішно видано',
                        dueDate: book.dueDate
                    };
                }
            } else {
                // Додавання в список очікування
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
}