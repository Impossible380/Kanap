// 1 requêter l'API pour lui demander l'ensemble des produits
// 2 parcourir les produits
// 3 insérer chaque produit dans le DOM de la page d'accueil

const resultats = await fetch("http://localhost:3000/api/products");
const json = await resultats.json();

for (let i = 0 ; i < json.length ; i++) {
    const id = json[i]["_id"];
    const image_description = json[i]["altTxt"];
    const colors = json[i]["colors"];
    const product_description = json[i]["description"];
    const image = json[i]["imageUrl"];
    const name = json[i]["name"];
    const price = json[i]["price"];

    const html_produit = `
    <a href="./product.html?id=${id}">
        <article>
            <img src="${image}" alt="${image_description}">
            <h3 class="productName">${name}</h3>
            <p class="productDescription">${product_description}</p>
            <p class="productColors"><b>Couleurs :</b> ${colors}</p>
            <p class="productPrice"><b>Prix :</b> ${price} €</p>
        </article>
    </a>`;

    document.getElementById("items").innerHTML += html_produit;

    // console.log(html_produit);
};

console.log(json);
// console.log(json[0]["_id"]);