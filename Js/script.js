const btnHamb = document.getElementById('btnHamb');
const navHamburguer = document.getElementById('navHamburguer');

//Modal
setTimeout(function() {
  $('#meuModal').modal('show');
}, 2000); // Tempo em milissegundos (2 segundos neste caso)

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
