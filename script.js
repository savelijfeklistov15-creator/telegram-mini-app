Telegram.WebApp.ready();

const products = [
  {id:1,title:"Товар 1",price:15000,img:"https://picsum.photos/500?1",link:"https://avito.ru"},
  {id:2,title:"Товар 2",price:22000,img:"https://picsum.photos/500?2",link:"https://avito.ru"},
  {id:3,title:"Товар 3",price:8000,img:"https://picsum.photos/500?3",link:"https://avito.ru"}
];

let cart = JSON.parse(localStorage.getItem("cart")||"[]");
let currentProduct = null;

function openPage(id) {
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  header.innerText =
    id==="list"?"Объявления":
    id==="cart"?"Корзина":
    id==="profile"?"Профиль":"Товар";

  if(id==="cart") renderCart();
}

function renderProducts() {
  productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  products.forEach(p=>{
    productsDiv.innerHTML += `
    <div class="card" onclick="openProduct(${p.id})">
      <img src="${p.img}">
      <div>${p.title}<br>${p.price} ₽</div>
    </div>`;
  });
}

function openProduct(id) {
  currentProduct = products.find(p=>p.id===id);
  productImg.src = currentProduct.img;
  productTitle.innerText = currentProduct.title;
  productPrice.innerText = currentProduct.price+" ₽";
  openPage("productPage");
}

function addCurrentToCart() {
  cart.push(currentProduct);
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("Добавлено в корзину");
}

function renderCart() {
  let sum = 0;
  cartItems.innerHTML = "";
  cart.forEach(p=>{
    sum += p.price;
    cartItems.innerHTML += <div>${p.title} — ${p.price} ₽</div>;
  });
  total.innerText = "Итого: "+sum+" ₽";
}

function buy() {
  window.open(currentProduct.link,"_blank");
}

function saveProfile() {
  localStorage.setItem("name",name.value);
}

function setAvatar(e) {
  const r=new FileReader();
  r.onload=()=>{ avatar.src=r.result; localStorage.setItem("avatar",r.result); }
  r.readAsDataURL(e.target.files[0]);
}

name.value = localStorage.getItem("name")||"";
if(localStorage.getItem("avatar")) avatar.src=localStorage.getItem("avatar");

renderProducts();