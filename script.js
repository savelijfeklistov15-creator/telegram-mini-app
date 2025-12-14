Telegram.WebApp.ready();

const products = [
    {id:1, title:"iPhone 12", price:25000, cat:"phones", img:"https://picsum.photos/400?1"},
    {id:2, title:"iPhone 13", price:32000, cat:"phones", img:"https://picsum.photos/400?2"},
    {id:3, title:"Samsung S21", price:21000, cat:"phones", img:"https://picsum.photos/400?3"},
    {id:4, title:"AirPods", price:9000, cat:"tech", img:"https://picsum.photos/400?4"},
    {id:5, title:"PlayStation 5", price:48000, cat:"tech", img:"https://picsum.photos/400?5"},
    {id:6, title:"Ноутбук", price:55000, cat:"tech", img:"https://picsum.photos/400?6"},
    {id:7, title:"Кресло", price:7000, cat:"other", img:"https://picsum.photos/400?7"},
    {id:8, title:"Часы", price:6000, cat:"other", img:"https://picsum.photos/400?8"}
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function render(list) {
    const grid = document.getElementById("products");
    grid.innerHTML = "";
    list.forEach(p => {
        grid.innerHTML += `
        <div class="card">
            <img src="${p.img}">
            <div class="info">
                <div class="price">${p.price} ₽</div>
                <div class="title">${p.title}</div>
                <div class="actions">
                    <button class="buy">Купить</button>
                    <button class="add" onclick="add(${p.id})">+</button>
                </div>
            </div>
        </div>`;
    });
}

render(products);

function openPage(id) {
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    document.getElementById("pageTitle").innerText =
        id === "shop" ? "Объявления" : id === "cart" ? "Корзина" : "Профиль";
    if(id==="cart") showCart();
}

function filterCat(cat, btn) {
    document.querySelectorAll(".cat").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    render(cat==="all"?products:products.filter(p=>p.cat===cat));
}

function add(id) {
    cart.push(products.find(p=>p.id===id));
    localStorage.setItem("cart", JSON.stringify(cart));
}

function showCart() {
    const box = document.getElementById("cartItems");
    let sum = 0;
    box.innerHTML = "";
    cart.forEach(p=>{
        sum+=p.price;
        box.innerHTML += <div>${p.title} — ${p.price} ₽</div>;
    });
    document.getElementById("cartTotal").innerText = "Итого: "+sum+" ₽";
}

function checkout() {
    alert("Переход на Avito");
}

function saveProfile() {
    localStorage.setItem("name", name.value);
}

function setAvatar(e) {
    const r = new FileReader();
    r.onload = ()=>{ avatar.src=r.result; localStorage.setItem("avatar",r.result); };
    r.readAsDataURL(e.target.files[0]);
}

if(localStorage.getItem("avatar")) avatar.src = localStorage.getItem("avatar");
name.value = localStorage.getItem("name") || "";