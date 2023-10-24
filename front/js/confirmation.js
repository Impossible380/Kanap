const current_url = document.location.search;
const searchParams_product = new URLSearchParams(current_url);
const id = searchParams_product.get("orderId");

document.getElementById("orderId").innerHTML += `${id}`;




/* Vider le panier après validation de la commande
Afficher un message après l'ajout d'un élément au panier */