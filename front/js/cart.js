// localStorage.clear();

const products = []

// On ajoute des crochets dans un string dans le cart du localStorage, sinon une erreur indiquera que localStorage.cart est indéfini
if (localStorage.length == 0 || localStorage.cart.length == 0) {
    localStorage.cart = '[]';
}

// On affecte à la variable cart la conversion du string de localStorage.cart en object
let cart = JSON.parse(localStorage.cart);


let articles_list = [];

// On crée deux variables pour les totaux de la quantité et du prix
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
    }

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

    // On ajoute au total de la quantité la quantité de l'article et à celui du prix le prix de l'article multiplié par la quantité de celui-ci
    total_quantity += item.quantity;
    total_price += item.quantity * product.price;
}

let articles_join = articles_list;
articles_join.join();
document.getElementById("cart__items").innerHTML = articles_join;

// On affiche les totaux de la quantité et du prix
document.getElementById("totalQuantity").innerHTML = total_quantity;
document.getElementById("totalPrice").innerHTML = total_price;

const changeQuantity = document.querySelectorAll(".itemQuantity");
const deleteOfCart = document.querySelectorAll(".deleteItem");

// Début boucle de la modification et de la suppression des produits
for (let i = 0 ; i < cart.length ; i++) {
    const item = cart[i];
    // Début changeQuantity
    changeQuantity[i].addEventListener('change', function() {
        let product = products.find(function(p, index) {
            return p._id === item.id
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
            return item_filter.id !== item.id;
        });
        
        let product = products.find(function(p, index) {
            return p._id === item.id
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
// Fin boucle de la modification et de la suppression des produits


const firstName = document.getElementById('firstName');
let firstNameRegexTest = false;

firstName.addEventListener('change', function(event) {
    const firstNameRegex = /\d+/g;
    firstNameRegexTest = firstNameRegex.test(firstName.value);
    console.log("Test regex prénom", firstName.value, firstNameRegexTest);
});


const lastName = document.getElementById('lastName');
let lastNameRegexTest = false;

lastName.addEventListener('change', function(event) {
    const lastNameRegex = /\d+/g;
    lastNameRegexTest = lastNameRegex.test(lastName.value);
    console.log("Test regex nom", lastName.value, lastNameRegexTest);
});


const address = document.getElementById('address');
let addressRegexTest = false;

address.addEventListener('change', function(event) {
    const addressRegex = /.+/g;
    addressRegexTest = addressRegex.test(address.value);
    console.log("Test regex adresse", address.value, addressRegexTest);
});


const city = document.getElementById('city');
let cityRegexTest = false;

city.addEventListener('change', function(event) {
    const cityRegex = /.+/g;
    cityRegexTest = cityRegex.test(city.value);
    console.log("Test regex ville", city.value, cityRegexTest);
});


const email = document.getElementById('email');
let emailRegexTest = false;

email.addEventListener('change', function(event) {
    const emailRegex = /.+@.+\..+/g;
    emailRegexTest = emailRegex.test(email.value);
    console.log("Test regex email", email.value, emailRegexTest);
});


// On pointe sur l'élément de bouton
const validCommand = document.getElementById("order");

// Début validCommand
validCommand.addEventListener('click', function() {
    // On pointe sur l'élément de champ de saisie de la couleur
    if (!firstNameRegexTest && !lastNameRegexTest && addressRegexTest && cityRegexTest && emailRegexTest) {
        console.log("Coordonnées validées");
    } else {
        console.log("Coordonnées refutées");
    }
});
// Fin validCommand


/*

### qualifier
. ==> n'importe quel caractère
\d ==> n'importe quel caractère numérique

### quantifier
+ ==> 1 ou plus
* ==> 0 ou plus
*/


// Lien vidéo : https://www.youtube.com/watch?v=ZocfMM0qofA




/* Problèmes

1) Si le panier est vide, ça va planter sur cette page.

*/


/* A faire

1) Gérer la suppresion
2) Gérer la modification

*/