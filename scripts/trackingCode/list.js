const merchant_id = "107016";

window.gdeslon_q = window.gdeslon_q || [];
window.gdeslon_q.push({
    page_type: "list", //тип страницы: main, list, card, basket, thanks, other
    merchant_id: merchant_id, //id оффера в нашей системе
    order_id: "", //id заказа
    category_id: "", //id текущей категории
    products: [],
    deduplication: localStorage.getItem(`deduplication_${merchant_id}`), //параметр дедупликации заказов (динамическое значение)
    user_id: "" //идентификатор пользователя
});

