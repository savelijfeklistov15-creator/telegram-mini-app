function show(id) {
  document.getElementById("shop").style.display = "none";
  document.getElementById("cart").style.display = "none";
  document.getElementById("profile").style.display = "none";

  document.getElementById(id).style.display = "block";
}