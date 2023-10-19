// localStorage.clear();

const products = []

// On ajoute des crochets dans un string dans le cart du localStorage, sinon une erreur indiquera que localStorage.cart est indéfini
if (localStorage.length == 0 || localStorage.cart.length == 0) {
    localStorage.cart = '[]';
}

// On affecte à la variable cart la conversion du string de localStorage.cart en object
let cart = JSON.parse(localStorage.cart);


// let articles_list = [];

// On crée deux variables pour les totaux de la quantité et du prix
let total_quantity = 0;
let total_price = 0;


// Début de la boucle d'affichage des produits
for (let i = 0 ; i < cart.length ; i++) {
    const item = cart[i];

    let product = products.find(function(p, index) {
        return p._id === item.id
    });

    if (product === undefined) {
        const response = await fetch(`http://localhost:3000/api/products/${item.id}`);
        product = await response.json();
        products.push(product);
    }

    console.log(products);

    /* articles_list.push(`
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
    </article>`); */

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
    </article>`

    // On ajoute au total de la quantité la quantité de l'article et à celui du prix le prix de l'article multiplié par la quantité de celui-ci
    total_quantity += item.quantity;
    total_price += item.quantity * product.price;
}
// Fin de la boucle d'affichage des produits


// On affiche les totaux de la quantité et du prix
document.getElementById("totalQuantity").innerHTML = total_quantity;
document.getElementById("totalPrice").innerHTML = total_price;


const changeQuantity = document.querySelectorAll(".itemQuantity");
const deleteOfCart = document.querySelectorAll(".deleteItem");


// Début boucle de la modification des quantités et de la suppression des produits
for (let i = 0 ; i < cart.length ; i++) {
    const item = cart[i];

    // Début changeQuantity
    changeQuantity[i].addEventListener('change', function() {
        let product = products.find(function(p, index) {
            return p._id === item.id;
        });

        // On affecte l'ancienne quantité dans une nouvelle variable et la nouvelle dans la propriété quantity de l'item
        let ancient_quantity = item.quantity;
        item.quantity = parseInt(this.value);

        // On affecte à localStorage.cart la conversion de l'object de la variable cart en string
        localStorage.cart = JSON.stringify(cart);
        console.log({cart:cart});

        // On met à jour les totaux de la quantité et du prix
        total_quantity += item.quantity - ancient_quantity;
        total_price += (item.quantity - ancient_quantity) * product.price;

        // On affiche les nouveaux totaux de la quantité et du prix
        document.getElementById("totalQuantity").innerHTML = total_quantity;
        document.getElementById("totalPrice").innerHTML = total_price;
    });
    // Fin changeQuantity


    const article = deleteOfCart[i].closest("article.cart__item");
    
    // Début deleteOfCart
    deleteOfCart[i].addEventListener('click', function() {
        cart = cart.filter(function(item_filter, index) {
            return item_filter.id !== item.id || item_filter.color !== item.color;
        });
        
        let product = products.find(function(p, index) {
            return p._id === item.id;
        });

        // On affecte à localStorage.cart la conversion de l'object de la variable cart en string
        localStorage.cart = JSON.stringify(cart);
        console.log({cart:cart});

        console.log(article);
        article.remove();

        // On met à jour les totaux du prix et de la quantité
        total_quantity -= item.quantity;
        total_price -= item.quantity * product.price;

        // On affiche les nouveaux totaux du prix et de la quantité
        document.getElementById("totalQuantity").innerHTML = total_quantity;
        document.getElementById("totalPrice").innerHTML = total_price;
    });
    // Fin deleteOfCart
}
// Fin boucle de la modification des quantités et de la suppression des produits


const changeFormInput = document.querySelectorAll(".cart__order__form__question input");
const formInputRegexList = [/^[a-zA-Z- ]+$/g, /^[a-zA-Z- ]+$/g, /^[a-zA-Z0-9- ]+$/g, /^[a-zA-Z0-9- ]+$/g,
/^[a-zA-Z0-9- ]+@[a-zA-Z- ]+\.[a-zA-Z- ]+$/g];

let formInputRegexTestList = []

// Début boucle de la modification des champs de saisie
for (let i = 0 ; i < changeFormInput.length ; i++) {
    console.log(formInputRegexList[i]);

    formInputRegexTestList.push(false);
    formInputRegexTestList[i] = formInputRegexList[i].test(changeFormInput[i].value);

    // Début changeFormInput
    changeFormInput[i].addEventListener('change', function() {
        formInputRegexTestList[i] = formInputRegexList[i].test(changeFormInput[i].value);
        console.log("Test regex prénom", changeFormInput[i].value, formInputRegexTestList[i]);
    });
    // Fin changeFormInput
}
// Fin boucle de la modification des champs de saisie


// On pointe sur l'élément de bouton
const validCommand = document.getElementById("order");

// Début validCommand
validCommand.addEventListener('click', async function(event) {
    event.preventDefault();

    if (formInputRegexTestList.every((element) => element === true)) {
        console.log("Coordonnées validées");

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const email = document.getElementById("email");

        const totals = cart.map(function (item_cart) {
            return item_cart.id
        });

        const response = await fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value
                },
                products: totals
            })
        });

        const products_command = await response.json();

        console.log(products_command.orderId);

    } else {
        console.log("Coordonnées réfutées");
    }
});
// Fin validCommand




/* console.log("Coordonnées validées");
    const response = await fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contact: {
                firstName: 'Davy',
                lastName: 'Gueudré',
                address: '8 rue du poirier',
                city: 'Orléans',
                email: 'dgueudre@gmail.com'
            },
            products: ["415b7cacb65d43b2b5c1ff70f3393ad1"]
        })
    });
*/



/*

### qualifier
. ==> n'importe quel caractère
\d ==> n'importe quel caractère numérique

### quantifier
+ ==> 1 ou plus
* ==> 0 ou plus
*/


// Lien vidéo : https://www.youtube.com/watch?v=ZocfMM0qofA
// Lien RegEx : https://cheatography.com/davechild/cheat-sheets/regular-expressions/