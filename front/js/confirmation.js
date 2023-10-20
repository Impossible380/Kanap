const response = await fetch("http://localhost:3000/api/products/order");
const products_command = await response.json();

console.log(products_command);

console.log(document.getElementById("email"));
console.log(document.getElementById("orderId"));