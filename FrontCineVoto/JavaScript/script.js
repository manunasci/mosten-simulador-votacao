
const menuHamburguer = document.querySelector('.menu-hamburguer');
const navLinks = document.querySelector('.nav-links');

menuHamburguer.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

