// script.js — ПОЛНАЯ РАБОЧАЯ ВЕРСИЯ

/* ================== DATA ================== */
const productsData = [
  {
    id: 1,
    name: "Беспроводные наушники",
    price: 2990,
    img: "https://via.placeholder.com/600",
    desc: "Качественные беспроводные наушники с шумоподавлением."
  },
  {
    id: 2,
    name: "Смартфон 128 ГБ",
    price: 19990,
    img: "https://via.placeholder.com/600",
    desc: "Современный смартфон с отличной камерой и быстрой зарядкой."
  },
  {
    id: 3,
    name: "Кроссовки мужские",
    price: 5990,
    img: "https://via.placeholder.com/600",
    desc: "Удобные кроссовки для спорта и города."
  },
  {
    id: 4,
    name: "Городской рюкзак",
    price: 2490,
    img: "https://via.placeholder.com/600",
    desc: "Вместительный рюкзак с отделением под ноутбук."
  }
];

/* ================== STATE ================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProductId = null;

/* ================== NAV ================== */
function openPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "cart") renderCart();
}

/* ================== PRODUCTS ================== */
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  productsData.forEach(p => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>${p.price} ₽</p>
    `;
    card.onclick = () => openProduct(p.id);
    container.appendChild(card);
  });
}

/* ================== PRODUCT MODAL ================== */
function openProduct(id) {
  const p = productsData.find(x => x.id === id);
  if (!p) return;

  currentProductId = id;

  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalPrice").textContent = p.price + " ₽";
  document.getElementById("modalDesc").textContent = p.desc;

  document.getElementById("productModal").classList.add("active");
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("active");
}

/* ================== CART ================== */
function addToCart(id) {
  const product = productsData.find(p => p.id === id);
  if (!product) return;

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  closeProduct();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("totalPrice");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} ₽</span>
      <button onclick="removeFromCart(${index})">Удалить</button>
    `;
    container.appendChild(row);
  });

  totalEl.textContent = total + " ₽";
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* ================== PROFILE ================== */
function toggleProfileEdit() {
  document.getElementById("profileEdit").classList.toggle("active");
}

function loadAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  document.getElementById("profileAvatar").src = url;
  localStorage.setItem("avatar", url);
}

function saveProfile() {
  const nick = document.getElementById("nickname").value.trim();
  if (!nick) return;

  document.getElementById("profileNick").textContent = nick;
  localStorage.setItem("nick", nick);
  toggleProfileEdit();
}

/* ================== INIT ================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const savedNick = localStorage.getItem("nick");
  const savedAvatar = localStorage.
getItem("avatar");

  if (savedNick) {
    document.getElementById("profileNick").textContent = savedNick;
  }

  if (savedAvatar) {
    document.getElementById("profileAvatar").src = savedAvatar;
  }
});