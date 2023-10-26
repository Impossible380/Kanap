const current_url = document.location.search;
const searchParams_product = new URLSearchParams(current_url);
const id = searchParams_product.get("orderId");

document.getElementById("orderId").innerHTML += `${id}`;