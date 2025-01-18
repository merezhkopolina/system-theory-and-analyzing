document.addEventListener('DOMContentLoaded', () => {
    const book = new Book("1984", "George Orwell", "978-0451524935");
    const stateManager = new BookStateManager(book);
    
    // Додаємо елементи управління станами на сторінку
    const stateControls = document.createElement('div');
    stateControls.innerHTML = `
        <div class="state-controls">
            <h3>Управління станом книги</h3>
            <button onclick="reserveBook()">Зарезервувати</button>
            <button onclick="checkOutBook()">Видати</button>
            <button onclick="returnBook()">Повернути</button>
            <button onclick="checkBookStatus()">Перевірити стан</button>
            <div id="currentState"></div>
            <div id="stateHistory"></div>
        </div>
    `;
    document.body.appendChild(stateControls);
    
    updateStateDisplay();
});

function updateStateDisplay() {
    const currentState = document.getElementById('currentState');
    currentState.textContent = `Поточний стан: ${stateManager.state}`;
    
    const history = stateManager.getStateHistory();
    const historyDiv = document.getElementById('stateHistory');
    historyDiv.innerHTML = '<h4>Історія станів:</h4>' + 
        history.map(h => `
            <div class="history-item">
                ${h.state} - ${h.timestamp.toLocaleString()} - ${h.reason}
            </div>
        `).join('');
}

// Функції для кнопок
function reserveBook() {
    const member = new Member("John Doe", "M001");
    stateManager.reserve(member);
    updateStateDisplay();
}

function checkOutBook() {
    stateManager.checkOut();
    updateStateDisplay();
}

function returnBook() {
    stateManager.return();
    updateStateDisplay();
}

function checkBookStatus() {
    stateManager.checkStatus();
    updateStateDisplay();
}
