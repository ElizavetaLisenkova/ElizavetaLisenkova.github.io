let btn = document.getElementsByName('addtocart');
let currentIndex;

// btn.addEventListener('click', addToCart(), false);

function addToCart() {
    //init
    var cart = [];
    var stringCart;
    let getprice = document.getElementById("price").innerText;
    let getproductName = document.getElementById("productName").innerText;
    let getCount = document.getElementById("count").innerText;
    //cycles siblings for product info near the add button
   
    //create product object
    let product = {
        productname : getproductName,
        price : getprice,
        count: getCount
    };
    
    if(!sessionStorage.getItem('cart')){
        //append product JSON object to cart array
        cart.push(product);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        
    }
    else {
        cart = JSON.parse(sessionStorage.getItem('cart'));
     
        if (containsItem(product)) {
                product.count = JSON.stringify(parseInt(product.count) + parseInt(cart[currentIndex].count));
                cart[currentIndex] = product;
                stringCart = JSON.stringify(cart);
                sessionStorage.setItem("cart", stringCart);
              } else {
                cart.push(product);
                //cart to JSON
                stringCart = JSON.stringify(cart);
                //create session storage cart item
                sessionStorage.setItem('cart', stringCart);
            }
        }
      alert("Товар добавлен в корзину.");
    }

    function containsItem(product) {
        cart = JSON.parse(sessionStorage.getItem('cart'));
        let index = cart.map(function(e) {
            return e.productname;
        }).indexOf(product.productname);
        if (index != (-1)){
            currentIndex = index
            return true
        } else return false;
    }