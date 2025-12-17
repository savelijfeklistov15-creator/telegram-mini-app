// script.js
const productsData = [
  { id: 1, name: "Наушники", price: 2990, img: "https://via.placeholder.com/300" },
  { id: 2, name: "Смартфон", price: 19990, img: "https://via.placeholder.com/300" },
  { id: 3, name: "Кроссовки", price: 5990, img: "https://via.placeholder.com/300" },
  { id: 4, name: "Рюкзак", price: 2490, img: "https://via.placeholder.com/300" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (id === "cart") renderCart();
}

function renderProducts() {
  const container = document.getElementById("products");
  productsData.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>${p.price} ₽</p>
      <button onclick="addToCart(${p.id})">В корзину</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = productsData.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("totalPrice");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} ₽</span>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = total + " ₽";
}

function loadAvatar(event) {
  const img = document.getElementById("avatarPreview");
  img.src = URL.createObjectURL(event.target.files[0]);
}

function saveProfile() {
  localStorage.setItem("nickname", document.getElementById("nickname").value);
}

renderProducts();