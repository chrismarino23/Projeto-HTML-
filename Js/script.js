const btnHamb = document.getElementById("btnHamb");
const navHamburguer = document.getElementById("navHamburguer");

//Modal
setTimeout(function () {
  $("#meuModal").modal("show");
}, 2000); // Tempo em milissegundos (2 segundos neste caso)

let textoAtual = "Menu";
btnHamb.addEventListener("click", () => {
  if (textoAtual === "Menu") {
    btnHamb.textContent = "close";
    textoAtual = "close";
  } else {
    btnHamb.textContent = "Menu";
    textoAtual = "Menu";
  }

  navHamb.style.display = navHamb.style.display === "block" ? "none" : "block";
});

document.addEventListener("DOMContentLoaded", function () {
  // Verifica se há um hash na URL
  if (window.location.hash) {
    // Remove o caractere `#` da âncora
    var tabId = window.location.hash.substring(1);

    // Ativa a aba correspondente
    var tabElement = document.getElementById(tabId);
    if (tabElement) {
      // Simula um clique na aba para ativá-la
      tabElement.click();
    }
  }

  //close cart's modal at products screen.
  btn_fechar_modal_cart_x.addEventListener("click", () => {
    $("#cartModal").modal("hide");
  });
  btn_fechar_modal_cart.addEventListener("click", () => {
    $("#cartModal").modal("hide");
  });
});

//Modal add to cart

function abrirModal(img, produto) {
  let imagem = document.getElementById("imgSelecionada");
  imagem.src = img;
  imagem.style.width = "200px";
  imagem.style.height = "200px";
  document.getElementById("produtoSelecionado").innerText = `${produto}`;
  document.getElementById("quantidade").value = 1;
  $("#cartModal").modal("show");
}

function alterarQuantidade(delta) {
  let quantidadeInput = document.getElementById("quantidade");
  let quantidade = parseInt(quantidadeInput.value);
  quantidade = Math.max(1, quantidade + delta); // Garante que a quantidade mínima é 1
  quantidadeInput.value = quantidade;
}
