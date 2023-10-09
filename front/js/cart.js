const cart = localStorage.cart;
const item = cart.item;

for (let i = 0 ; i < cart.length ; i++) {document.querySelector("#cart__items").innerHTML = `
    <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
            <img src="" alt="">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2></h2>
                <p>Vert</p>
                <p>42,00 €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
}



/* const current_url = document.location.search;
const searchParams_product = new URLSearchParams(current_url);
const id = searchParams_product.get("id");

const response = await fetch(`http://localhost:3000/api/products/${id}`);
const product = await response.json();


console.log(localStorage.cart);

document.querySelector("#cart__items").innerHTML = `
<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
        <img src="${product.image}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>Vert</p>
            <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>`; */