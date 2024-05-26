const imagens = document.querySelectorAll('.banner-container img');
const btnHamb = document.getElementById('btnHamb');
const navHamburguer = document.getElementById('navHamburguer');

// function mostrarAlerta() {
//   document.getElementById("meuAlerta").style.display = "block";
// }

// function fecharAlerta() {
//   document.getElementById("meuAlerta").style.transition = "opacity 0.3s ease-in-out";
//   document.getElementById("meuAlerta").classList.add("hidden");
//   setTimeout(function() {
//       document.getElementById("meuAlerta").style.display = "none";
//   }, 300); // Tempo em milissegundos (0.3s = 300ms)
// }

// window.onload = mostrarAlerta;

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

    // menuNav.classList.toggle('show');
    navHamb.style.display = navHamb.style.display === 'block' ? 'none' : 'block';
});

let imagemAtiva = 1;
function trocarImagem(direcao) {
  imagens[imagemAtiva - 1].style.opacity = 0;
  imagemAtiva += direcao;
  
  if (imagemAtiva > imagens.length) {
    imagemAtiva = 1;
  } else if (imagemAtiva < 1) {
      imagemAtiva = imagens.length;
  }
    
  imagens[imagemAtiva - 1].style.display = 'flex';
  imagens[imagemAtiva - 1].style.opacity = 1;

  // Atualizar bolinhas de navegação
  const indicadorAtivo = document.querySelector('.indicador.ativo');
  indicadorAtivo?.classList.remove('ativo');

  let novoIndice = imagemAtiva + direcao;
  if (novoIndice > imagens.length) {
    novoIndice = 1;
  } else if (novoIndice < 1) {
    novoIndice = imagens.length;
  }

  const novoIndicador = document.querySelector(`.indicador[data-indice="${novoIndice}"]`);
  novoIndicador.classList.add('ativo');
}

setInterval(() => trocarImagem(1), 6000);


const botaoAnterior = document.querySelector('.banner-anterior');
const botaoProximo = document.querySelector('.banner-proximo');

botaoAnterior.addEventListener('click', () => trocarImagem(-1));
botaoProximo.addEventListener('click', () => trocarImagem(1));

// Adicionar evento de clique nas bolinhas
const indicadores = document.querySelectorAll('.indicador');
indicadores.forEach(indicador => {
  indicador.addEventListener('click', () => {
    const indice = parseInt(indicador.dataset.indice);
    trocarImagem(indice - imagemAtiva);
  });
});