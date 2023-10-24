/* array.forEach(callback) : parcourir les éléments
array.map(callback) : transformer le tableau en changeant la structure des éléments
array.find(callback) : trouver un des éléments du tableau
array.filter(callback) : récupérer un tableau avec moins d'éléments (filtrer)
array.join(séparateur) : concaténer tous les éléments dans une seule chaîne de caractères */


// Retourne un tableau de tous les éléments
// http://localhost:3000/api/products/

// Renvoie l'élément correspondant à
// {product-ID}, identifiant d’un produit
// http://localhost:3000/api/products/{product_id}

// Retourne l'objet contact, le tableau
// produits et orderId
// http://localhost:3000/api/products/order


const current_url = document.location.search;
const searchParams_product = new URLSearchParams(current_url);
const id = searchParams_product.get("id");

const response = await fetch(`http://localhost:3000/api/products/${id}`);
const product = await response.json();


document.querySelector(".item__img").innerHTML = `
<img src="${product.imageUrl}" alt="${product.altTxt}">`;
document.getElementById("title").innerHTML = product.name;
document.getElementById("price").innerHTML = product.price;
document.getElementById("description").innerHTML = product.description;

document.getElementById("colors").innerHTML += product.colors
    .map(function (color) {
        return `<option value="${color}">${color}</option>`
    })
    .join("");




// On pointe sur l'élément de bouton
const addToCart = document.getElementById("addToCart");
// On pointe sur l'élément de champ de saisie de la quantité
const quantityInput = document.getElementById("quantity");
// On pointe sur l'élément de champ de saisie de la couleur
const colorInput = document.getElementById("colors");


// localStorage.clear();

// On ajoute des crochets dans un string dans le cart du localStorage, sinon une erreur indiquera que localStorage.cart est indéfini
if (localStorage.length == 0 || localStorage.cart.length == 0) {
    localStorage.cart = '[]'
}

// On affecte à la variable cart la conversion du string de localStorage.cart en object
const cart = JSON.parse(localStorage.cart);
console.log(localStorage.cart);
console.log(cart);


document.querySelector("#addToCart").innerHTML += `<h6 id="addToCart_message"></h6>`;


// Début onCartClick
addToCart.addEventListener('click', function () {
    const item = {};

    item.id = id;
    item.quantity = parseInt(quantityInput.value);
    item.color = colorInput.value;

    if ((item.quantity < 1 || item.quantity > 100) || item.color == "") {
        document.querySelector("#addToCart_message").innerHTML = `Il faut choisir une couleur pour l'article et la quantité de ce dernier doit
        être entre 1 et 100`;
        return;
    }

    const cart_item_index = cart.findIndex(function(cart_item) {
        return cart_item.id == item.id && cart_item.color == item.color;
    });

    if (cart_item_index === -1) {
        cart.push(item);
        document.querySelector("#addToCart_message").innerHTML = "article ajouté au panier";

    } else {
        cart[cart_item_index].quantity += item.quantity;
        document.querySelector("#addToCart_message").innerHTML = "quantité de l'article augmentée";
    }

    // On affecte à localStorage.cart la conversion de l'object de la variable cart en string
    localStorage.cart = JSON.stringify(cart);
    
    console.log(localStorage);
});
// Fin onCartClick


// number (examples : int, float), string, array, object (example : dict), function