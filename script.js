Telegram.WebApp.ready();

/* ТОВАРЫ (30 ШТУК) */
const products = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    title: Товар №${i + 1},
    price: Math.floor(Math.random() * 40000 + 5000),
    image: "https://picsum.photos/400?random=" + i,
    link: "https://www.avito.ru/"
}));

const grid = document.getElementById("products");
const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

/* РЕНДЕР ТОВАРОВ */
products.forEach(p => {
    grid.innerHTML += `
    <div class="card">
        <img src="${p.image}">
        <div class="info">
            <div class="price">${p.price} ₽</div>
            <div class="title">${p.title}</div>
            <div class="actions">
                <button class="buy" onclick="window.open('${p.link}')">Купить</button>
                <button class="add" onclick="addToCart(${p.id})">+</button>
            </div>
        </div>
    </div>`;
});

/* НАВИГАЦИЯ */
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    event.target.classList.add("active");
    if (id === "cart") renderCart();
}

/* КОРЗИНА */
function addToCart(id) {
    cartItems.push(products[id]);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Добавлено в корзину");
}

function renderCart() {
    const box = document.getElementById("cart-items");
    box.innerHTML = "";
    let total = 0;
    cartItems.forEach(i => {
        total += i.price;
        box.innerHTML += <div>${i.title} — ${i.price} ₽</div>;
    });
    document.getElementById("total").innerText = "Итого: " + total + " ₽";
}

function checkout() {
    alert("Оформление через Avito");
}

/* ПРОФИЛЬ */
function saveProfile() {
    localStorage.setItem("name", username.value);
    alert("Сохранено");
}

function setAvatar(e) {
    const reader = new FileReader();
    reader.onload = () => {
        avatar.src = reader.result;
        localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
}

/* ЗАГРУЗКА ПРОФИЛЯ */
username.value = localStorage.getItem("name") || "";
if (localStorage.getItem("avatar")) avatar.src = localStorage.getItem("avatar");