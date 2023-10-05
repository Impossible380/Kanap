// 1 requêter l'API pour lui demander l'ensemble des produits
// 2 parcourir les produits
// 3 insérer chaque produit dans le DOM de la page d'accueil

const response = await fetch("http://localhost:3000/api/products");
const products = await response.json();

for (let i = 0 ; i < products.length ; i++) {
    const product = products[i];

    const html_produit = `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            <p class="productColors"><b>Couleurs :</b> ${product.colors}</p>
            <p class="productPrice"><b>Prix :</b> ${product.price} €</p>
        </article>
    </a>`;

    document.getElementById("items").innerHTML += html_produit;
};

console.log(products);