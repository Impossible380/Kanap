/* const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);

console.log(searchParams.get("topic"));
console.log(searchParams.get("q")); */

const current_url = document.location.search;
const searchParams_product = new URLSearchParams(current_url);
console.log(searchParams_product.get("id"));

// document.querySelector(".item").innerHTML += searchParams_product.get("id");

const response = await fetch("http://localhost:3000/api/products");
const products = await response.json();

for (let i = 0 ; i < products.length ; i++) {
    const product = products[i];
    console.log(product._id == searchParams_product.get("id"));
    if (product._id == searchParams_product.get("id")) {
        document.querySelector(".item__img").innerHTML = `
        <img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.querySelector("#title").innerHTML = product.name;
        document.querySelector("#price").innerHTML = product.price;
        document.querySelector("#description").innerHTML = product.description;
        for (let j = 0 ; j < product.colors.length ; j++) {
            document.querySelector("#colors").innerHTML += `
            <option value="${product.colors[j]}">${product.colors[j]}</option>`;
        }
    }
}