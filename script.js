unction show(id) {
  document.querySelectorAll('.screen').forEach(el => {
    el.style.display = 'none';
  });

  document.getElementById(id).style.display = 'block';
}

function openProduct() {
  show('product');
}

// ГАРАНТИЯ СТАРТА
document.addEventListener('DOMContentLoaded', () => {
  show('shop');
});