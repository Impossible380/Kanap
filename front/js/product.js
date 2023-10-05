/* array.forEach(callback) : parcourir les éléments
array.map(callback) : transformer le tableau en changeant la structure des éléments
array.find(callback) : trouver un des éléments du tableau
array.filter(callback) : récupérer un tableau avec moins d'éléments (filtrer)
array.join(séparateur) : concaténer tous les éléments dans une seule chaîne de caractères */


// Retourne un tableau de tous les éléments
http://localhost:3000/api/products/

// Renvoie l'élément correspondant à
// {product-ID}, identifiant d’un produit
http://localhost:3000/api/products/{product_id}

// Retourne l'objet contact, le tableau
// produits et orderId
http://localhost:3000/api/products/order


const current_url = document.location.search;
const searchParams_product = new URLSearchParams(current_url);
const id = searchParams_product.get("id")

const response = await fetch("http://localhost:3000/api/products");
const products = await response.json();

const product = products
    .find(function (p) {
        return p._id == id
    });

document.querySelector(".item__img").innerHTML = `
<img src="${product.imageUrl}" alt="${product.altTxt}">`;
document.querySelector("#title").innerHTML = product.name;
document.querySelector("#price").innerHTML = product.price;
document.querySelector("#description").innerHTML = product.description;

document.querySelector("#colors").innerHTML += product.colors
    .map(function (color) {
        return `<option value="${color}">${color}</option>`
    })
    .join("")