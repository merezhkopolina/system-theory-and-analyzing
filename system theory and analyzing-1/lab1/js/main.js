document.addEventListener('DOMContentLoaded', () => {
    const library = new Library();
    const book1 = new Book("1984", "George Orwell", "978-0451524935");
    const member1 = new Member("John Doe", "M001");

    library.addBook(book1);
    library.members.push(member1);

    const demoDiv = document.createElement('div');
    demoDiv.innerHTML = `
        <div class="demo-controls">
            <button onclick="borrowBook()">Позичити книгу</button>
            <button onclick="returnBook()">Повернути книгу</button>
            <div id="status"></div>
        </div>
    `;
    document.body.appendChild(demoDiv);
});


function borrowBook() {
    const member = library.members[0];
    const book = library.books[0];
    const result = member.borrowBook(book);
    updateStatus(result ? "Книгу успішно позичено" : "Книга недоступна");
}

function returnBook() {
    const member = library.members[0];
    const book = library.books[0];
    const result = member.returnBook(book);
    updateStatus(result ? "Книгу успішно повернуто" : "Помилка повернення");
}

function updateStatus(message) {
    document.getElementById('status').textContent = message;
}