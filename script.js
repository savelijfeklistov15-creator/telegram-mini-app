let currentProduct = null;
let cart = [];

// Переключение экранов
function show(id) {
  document.querySelectorAll(".screen").forEach(s => {
    s.style.display = "none";
  });
  document.getElementById(id).style.display = "block";

  if (id === "cart") renderCart();
}

// Товар
function openProduct(title, price) {
  currentProduct = { title, price };
  document.getElementById("productTitle").innerText = title;
  document.getElementById("productPrice").innerText = price + " ₽";
  show("product");
}

// Корзина
function addToCart() {
  if (!currentProduct) return;
  cart.push(currentProduct);
  alert("Добавлено в корзину");
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");

  box.innerHTML = "";
  let sum = 0;

  cart.forEach(p => {
    sum += p.price;
    box.innerHTML += <p>${p.title} — ${p.price} ₽</p>;
  });

  total.innerText = "Итого: " + sum + " ₽";
}

// Профиль
function saveProfile() {
  const name = document.getElementById("username").value;
  if (name) {
    localStorage.setItem("username", name);
    document.getElementById("savedName").innerText = name;
  }
}

function setAvatar(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("avatar").src = reader.result;
    localStorage.setItem("avatar", reader.result);
  };
  reader.readAsDataURL(file);
}

// Загрузка при старте
document.addEventListener("DOMContentLoaded", () => {
  show("shop");

  const name = localStorage.getItem("username");
  if (name) {
    document.getElementById("savedName").innerText = name;
  }

  const avatar = localStorage.getItem("avatar");
  if (avatar) {
    document.getElementById("avatar").src = avatar;
  }
});