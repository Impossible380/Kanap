// Début onDeleteClick
/* function onDeleteClick() {
    const article = document.querySelectorAll("article.cart__item");
    console.log(article);
    console.log(deleteOfCartElement);
    const supprimer = deleteOfCartElement.closest("article.cart__item");
    console.log(supprimer);
}; */
// Fin onDeleteClick




// localStorage.clear();

if (localStorage.length == 0 || localStorage.cart.length == 0) {
    localStorage.cart = '[]';
};

const cart = JSON.parse(localStorage.cart);


console.log(localStorage.cart);
console.log(cart);

function affichageTempsReel() {
    let total_quantity = 0;
    let total_price = 0;
    
    for (let i = 0 ; i < cart.length ; i++) {
        document.getElementById("cart__items").innerHTML += `
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
        </article>`;
    
        total_quantity += item.quantity;
        total_price += item.quantity * product.price;
    };
    
    document.getElementById("totalQuantity").innerHTML = total_quantity;
    document.getElementById("totalPrice").innerHTML = total_price;
};


let total_quantity = 0;
let total_price = 0;

for (let i = 0 ; i < cart.length ; i++) {
    /* console.log(cart);
    console.log(localStorage.cart); */

    const item = cart[i];
    // console.log(item);

    const response = await fetch(`http://localhost:3000/api/products/${item.id}`);
    const product = await response.json();

    document.getElementById("cart__items").innerHTML += `
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
    </article>`;

    total_quantity += item.quantity;
    total_price += item.quantity * product.price;
};

document.getElementById("totalQuantity").innerHTML = total_quantity;
document.getElementById("totalPrice").innerHTML = total_price;

// affichageTempsReel;


const deleteOfCart = document.querySelectorAll("p.deleteItem");
console.log(deleteOfCart);

for (let i = 0 ; i < cart.length ; i++) {
    /* console.log(cart);
    console.log(localStorage.cart); */
    
    const item = cart[i];
    console.log(item);


    const deleteOfCartElement = deleteOfCart[i];
    /* console.log(deleteOfCart);
    console.log(deleteOfCartElement); */

    deleteOfCartElement.addEventListener('click', function() {
        document.getElementById("cart__items").innerHTML = ``;
        
        const article = deleteOfCartElement.closest("article.cart__item");
        console.log(article);

        cart.splice(i, 1);
        console.log(cart);
        localStorage.cart = JSON.stringify(cart);
        console.log(localStorage.cart);

        let total_quantity = 0;
        let total_price = 0;
        
        for (let i = 0 ; i < cart.length ; i++) {
            document.getElementById("cart__items").innerHTML += `
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
            </article>`;
        
            total_quantity += item.quantity;
            total_price += item.quantity * product.price;
        };
        
        document.getElementById("totalQuantity").innerHTML = total_quantity;
        document.getElementById("totalPrice").innerHTML = total_price;
    });
};




/* deleteOfCart.addEventListener('change', function(i) {
    console.log(i);
}); */




/* Problèmes

1) Si le panier est vide, ça va planter sur cette page.

*/


/* A faire

1) Gérer la suppresion
2) Gérer la modification

*/