let currentProduct = null;

function show(id) {
  document.getElementById("shop").style.display = "none";
  document.getElementById("cart").style.display = "none";
  document.getElementById("profile").style.display = "none";
  document.getElementById("product").style.display = "none";

  document.getElementById(id).style.display = "block";
}

// открыть товар
function openProduct(title, price) {
  currentProduct = { title, price };
  document.getElementById("productTitle").innerText = title;
  document.getElementById("productPrice").innerText = price + " ₽";
  show("product");
}

// старт
show("shop");