const orderId= document.getElementById("orderId").innerText;
const cart = JSON.parse(sessionStorage.getItem('cart'));

function getProducts() {
    products = []
    for (let i=0; i < cart.length; i++) {
        product = {
            "id": `${i+1}`,
            "price": `${cart[i].price}`,
            "quantity": `${cart[i].count}`
        };
        products.push(product);
    }
    return products;
};


window.gdeslon_q = window.gdeslon_q || [];
window.gdeslon_q.push({
    page_type: "thanks", //тип страницы: main, list, card, basket, thanks, other
    merchant_id: "107016", //id оффера в нашей системе
    order_id: `${orderId}`, //id заказа
    category_id: "", //id текущей категории
    products: getProducts(),
    deduplication: localStorage.getItem("deduplication"), //параметр дедупликации заказов (динамическое значение)
    user_id: "" //идентификатор пользователя
});

sessionStorage.clear();
