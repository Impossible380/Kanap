// localStorage.clear();

const products = []

if (localStorage.length == 0 || localStorage.cart.length == 0) {
    localStorage.cart = '[]';
};

let cart = JSON.parse(localStorage.cart);


let articles_list = []

let total_quantity = 0;
let total_price = 0;

for (let i = 0 ; i < cart.length ; i++) {
    const item = cart[i];

    let product = products.find(function(p, index) {
        return p._id === item.id
    });

    if (product === undefined) {
        const response = await fetch(`http://localhost:3000/api/products/${item.id}`);
        product = await response.json();
        products.push(product);
    };

    console.log(products);

    articles_list.push(`
    <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${item.color}</p>
                <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`);

    total_quantity += item.quantity;
    total_price += item.quantity * product.price;
};

let articles_join = articles_list;
articles_join.join();
document.getElementById("cart__items").innerHTML = articles_join;

document.getElementById("totalQuantity").innerHTML = total_quantity;
document.getElementById("totalPrice").innerHTML = total_price;

const changeQuantity = document.querySelectorAll(".itemQuantity");
const deleteOfCart = document.querySelectorAll(".deleteItem");

for (let i = 0 ; i < cart.length ; i++) {
    changeQuantity[i].addEventListener('change', function() {
        const item = cart[i];
        
        let product = products.find(function(p, index) {
            return p._id === item.id
        });

        let ancient_quantity = item.quantity;
        item.quantity = parseInt(this.value);

        localStorage.cart = JSON.stringify(cart);
        console.log({cart:cart});

        total_quantity += item.quantity - ancient_quantity;
        total_price += (item.quantity - ancient_quantity) * product.price;

        document.getElementById("totalQuantity").innerHTML = total_quantity;
        document.getElementById("totalPrice").innerHTML = total_price;
    });


    deleteOfCart[i].addEventListener('click', function() {
        const item = cart[i];

        cart = cart.filter(function(item, index) {
            return index !== i
        });
        
        let product = products.find(function(p, index) {
            return p._id === item.id
        });

        localStorage.cart = JSON.stringify(cart);
        console.log({cart:cart});

        const article = deleteOfCart[i].closest("article.cart__item");
        console.log(article);
        article.remove();

        total_quantity -= item.quantity;
        total_price -= item.quantity * product.price;

        document.getElementById("totalQuantity").innerHTML = total_quantity;
        document.getElementById("totalPrice").innerHTML = total_price;
    });
};




/* Problèmes

1) Si le panier est vide, ça va planter sur cette page.

*/


/* A faire

1) Gérer la suppresion
2) Gérer la modification

*/