const btnHamb = document.getElementById('btnHamb');
const navHamburguer = document.getElementById('navHamburguer');
let textoAtual = 'Menu';

btnHamb.addEventListener('click', () => {
    if (textoAtual === 'Menu') {
        btnHamb.textContent = 'close';
        textoAtual = 'close';
      } else {
        btnHamb.textContent = 'Menu';
        textoAtual = 'Menu';
      }
    navHamb.style.display = navHamb.style.display === 'block' ? 'none' : 'block';
});

