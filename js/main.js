// 1. Seleccionamos elementos del HTML
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// 2. Cuando hagan clic en el botón...
menuToggle.addEventListener('click', () => {
    // 3. ...prende o apaga la clase 'active'
    navLinks.classList.toggle('active');
});