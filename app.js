const API = "http://localhost:3000/api";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// UPDATE CART COUNT
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) {
    el.innerText = cart.reduce((sum, i) => sum + i.quantity, 0);
  }
}

// ADD TO CART
function addToCart(product) {
  const existing = cart.find(
    i => i.name === product.name && i.license === product.license
  );

  if (existing) existing.quantity += product.quantity;
  else cart.push(product);

  saveCart();
  updateCartCount();
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
}

// INIT
updateCartCount();