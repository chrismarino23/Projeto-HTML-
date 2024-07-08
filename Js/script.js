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
    document.getElementById("newPrice").style.display = "none";
    document.getElementById("valuePrice").style.display = "";
  });
  btn_fechar_modal_cart.addEventListener("click", () => {
    $("#cartModal").modal("hide");
    document.getElementById("newPrice").style.display = "none";
    document.getElementById("valuePrice").style.display = "";
  });
});

//Modal add to cart

function abrirModal(img, produto, price) {
  let imagem = document.getElementById("imgSelecionada");
  imagem.src = img;
  imagem.style.width = "200px";
  imagem.style.height = "200px";
  document.getElementById("produtoSelecionado").innerText = `${produto}`;
  document.getElementById("quantidade").value = 1;
  document.getElementById("valuePrice").innerText = parseFloat(`${price}`)
    .toFixed(2)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  $("#cartModal").modal("show");
}

function alterarQuantidade(delta) {
  let quantidadeInput = document.getElementById("quantidade");
  let quantidade = parseInt(quantidadeInput.value);
  quantidade = Math.max(1, quantidade + delta); // Garante que a quantidade mínima é 1
  quantidadeInput.value = quantidade;
  let price = document.getElementById("valuePrice").textContent;
  document.getElementById("valuePrice").style.display = "none";

  let newPrice = parseFloat(price * quantidade).toFixed(2);
  console.log(newPrice);
  document.getElementById("newPrice").innerText = `${newPrice}`;
  document.getElementById("newPrice").style.display = "";
}

var carrinho = [];

class ConstructCar {
  constructor(nameProduct, qtdKG, pricepKG, finalPrice) {
    this.nameProduct = nameProduct;
    this.qtdKG = parseInt(qtdKG);
    this.pricepKG = parseFloat(pricepKG);
    this.finalPrice = parseFloat(finalPrice);
  }
}

function adicionarAoCarrinho(nameProduct, qtdKG, pricepKG) {
  let nameFront = document.getElementById("ninhoCMorango").textContent;
  // let priceFront = document.getElementById("ninhoCMorango").textContent;
  // let nameFront = document.getElementById("ninhoCMorango").textContent;
  console.log(nameFront);
  let finalPrice = qtdKG * pricepKG;
  const newcart = new ConstructCar(nameProduct, qtdKG, pricepKG, finalPrice);

  carrinho.push[newcart];

  // console.log(carrinho);
  for (const desc in newcart) {
    console.log(`${desc} = ${newcart[desc]}`);
  }
}
