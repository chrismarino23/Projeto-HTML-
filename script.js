const btnHamb = document.getElementById('btnHamb');
const navHamburguer = document.getElementById('navHamburguer');

btnHamb.addEventListener('click', () => {
    navHamburguer.style.display = navHamburguer.style.display === 'none' ? 'flex' : 'none';
});