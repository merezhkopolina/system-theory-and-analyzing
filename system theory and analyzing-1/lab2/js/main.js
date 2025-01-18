document.addEventListener('DOMContentLoaded', () => {
    const orderProcessor = new BookOrderProcessor();
    const library = new Library();
    
    // Додаємо форму замовлення на сторінку
    const orderForm = document.createElement('div');
    orderForm.innerHTML = `
        <div class="order-form">
            <h3>Замовлення книги</h3>
            <input type="text" id="isbn" placeholder="ISBN книги">
            <input type="text" id="memberId" placeholder="ID читача">
            <button onclick="processOrder()">Замовити</button>
            <div id="orderStatus"></div>
        </div>
    `;
    document.body.appendChild(orderForm);
});

async function processOrder() {
    const isbn = document.getElementById('isbn').value;
    const memberId = document.getElementById('memberId').value;
    
    const result = await orderProcessor.processBookOrder(library, isbn, memberId);
    document.getElementById('orderStatus').textContent = result.message;
}