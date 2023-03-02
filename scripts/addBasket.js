
const items = document.getElementById('items');
const cart = JSON.parse(sessionStorage.getItem('cart'));
let total_order = 0;
const table = document.getElementById('table');
const forDeleteBtn = document.getElementById('forDeleteBtn');

function removeBasket() {
    sessionStorage.clear();
    location.reload();
}
if (cart != null) {
    for (let i=0; i < cart.length; i++) {
        total = parseInt(cart[i].price) * parseInt(cart[i].count);

        items.insertAdjacentHTML('beforeend', `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${cart[i].productname}</td>
        <td>${cart[i].price} * ${cart[i].count} шт.</td>
        <td>${total} руб.</td>
        </tr>
        `);
        total_order += total
    }
    
    items.insertAdjacentHTML('beforeend', `
    <tr>
        <th scope="row"></th>
        <td></td>
        <td><b>Итого:</b></td>
        <td id="order_tota"><b>${total_order} руб.</b></td>
        </tr>
     `);

    table.insertAdjacentHTML('afterend', `
    <div class="button-wrapper">
    <a href="create order.html" class="btn btn-success btn-lg" role="button" >Оформить заказ</a>
</div>
    `);
    forDeleteBtn.insertAdjacentHTML("afterbegin",
    `<button style=" margin: 0 0 10px 450px;"type="button" class="btn btn-light" onclick="removeBasket()">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
    Очистить корзину
</button>`

    )
} else {
    items.insertAdjacentHTML('beforeend', `
    <div class="button-wrapper">
    Корзина пуста.
    </div>
     `);
}
