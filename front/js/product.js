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




//On pointe sur l'élément de message
// const espaceMessage = document.getElementById("message");
//On pointe sur l'élément de bouton
const addToCart = document.getElementById("addToCart");
//On pointe sur l'élément de champ de saisie de la quantité
const quantityInput = document.getElementById("quantity");
//On pointe sur l'élément de champ de saisie de la couleur
const colorInput = document.getElementById("colors");


let quantity;
function onConvertQuantity(){  
  
    //On récupère la saisie de l'année et on transforme le texte en nombre entier
    quantity = parseInt(quantityInput.value);
    //Si la saisie n'est pas un nombre, on affiche un message d'erreur
    if(isNaN(quantity)){
      alert("Ceci n'est pas un nombre");
      return;
    }
    // const mois = annee * params[8];
    
    // ANALYSER ICI AVEC CONSOLE LOG
    // Analyser la variable quantity
    console.log("Quantité : " + quantity);
    // FIN ANALYSE
    
    // espaceMessage.innerHTML = "Quantité : " + quantity;
    return quantity
}


let color;
function onConvertColor(){  
  
    //On récupère la saisie de l'année et on transforme le texte en nombre entier
    color = colorInput.value;
    //Si la saisie n'est pas un nombre, on affiche un message d'erreur
    /* if(isNaN(color)){
      alert("Ceci n'est pas un chaîne de caractères");
      return;
    } */
    // const mois = annee * params[8];
    
    // ANALYSER ICI AVEC CONSOLE LOG
    // Analyser la variable quantity
    console.log("Couleur : " + color);
    // FIN ANALYSE
    
    // espaceMessage.innerHTML = "Color : " + color;
    return color
}
  
  
  
//On écoute l'action de click sur le onConvert et on appelle la fonction onConvert
addToCart.addEventListener('click', onConvertQuantity);
addToCart.addEventListener('click', onConvertColor);


localStorage.id = id
// localStorage.quantity = quantity
localStorage.quantity = onConvertQuantity
// localStorage.color = color
localStorage.color = onConvertColor

console.log(localStorage)