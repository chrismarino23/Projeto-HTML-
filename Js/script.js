const btnHamb = document.getElementById("btnHamb");
const navHamburguer = document.getElementById("navHamburguer");

//Modal
setTimeout(function () {
  $("#meuModal").modal("show");
}, 2000);

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
  parseFloat(price);
  let imagem = document.getElementById("imgSelecionada");
  imagem.src = img;
  imagem.style.width = "200px";
  imagem.style.height = "200px";
  document.getElementById("produtoSelecionado").innerText = `${produto}`;
  document.getElementById("quantidade").value = 1;
  document.getElementById("valuePrice").innerText = parseFloat(
    `${price}`
  ).toFixed(2);
  $("#cartModal").modal("show");
  document.getElementById("newPrice").style.display = "none";
  document.getElementById("valuePrice").style.display = "";
}

function alterarQuantidade(delta) {
  let quantidadeInput = document.getElementById("quantidade");
  let quantidade = parseInt(quantidadeInput.value);
  quantidade = Math.max(1, quantidade + delta); // Garante que a quantidade mínima é 1
  quantidadeInput.value = quantidade;

  let price = document.getElementById("valuePrice").textContent;
  document.getElementById("valuePrice").style.display = "none";

  let newPrice = parseFloat(price * quantidade).toFixed(2);
  let newPriceFront = document.getElementById("newPrice");
  newPriceFront.innerText = `${newPrice}`;
  newPriceFront.style.display = "";
}

var carrinho = [];
var carrinhoObject = {
  nome: "",
  quantidade: "",
  precoPKG: "",
  precoFinal: "",
};

class ConstructCar {
  constructor(nameProduct, qtdKG, pricepKG, finalPrice) {
    this.nameProduct = nameProduct;
    this.qtdKG = parseInt(qtdKG);
    this.pricepKG = parseFloat(pricepKG).toFixed(2);
    this.finalPrice = parseFloat(finalPrice).toFixed(2);
  }
}

document.getElementById("addToCart").addEventListener("click", () => {
  let quantidadeInput = document.getElementById("quantidade").value;

  let produtoSelecionado =
    document.getElementById("produtoSelecionado").textContent;

  let finalPrice = parseFloat(document.getElementById("newPrice").textContent);

  if (isNaN(finalPrice)) {
    let oldPrice = parseFloat(
      document.getElementById("valuePrice").textContent
    );
    finalPrice = oldPrice;
  }

  const cartItem = document.createElement("span");
  cartItem.className = "list-group-item";
  cartItem.style.display = "block";
  cartItem.style.color = "saddlebrown";
  cartItem.style.fontWeight = "bold";
  cartItem.style.borderTop = "1px solid brown";

  let pricepKG = finalPrice / quantidadeInput;

  document.getElementById("cart").appendChild(cartItem);

  const paragrafo = document.createElement("p");
  const paragrafo2 = document.createElement("p");
  const paragrafo3 = document.createElement("p");
  const paragrafo4 = document.createElement("p");
  const finalTotalPrice = document.createElement("p");

  paragrafo.className = "list-group-item";
  paragrafo2.className = "list-group-item";
  paragrafo3.className = "list-group-item";
  paragrafo4.className = "list-group-item";
  finalTotalPrice.className = "list-group";

  paragrafo.style.fontSize = "small";
  paragrafo2.style.fontSize = "small";
  paragrafo3.style.fontSize = "small";
  paragrafo4.style.fontSize = "small";
  finalTotalPrice.style.textAlign = "end";

  //constructor of car
  const newcartItem = new ConstructCar(
    produtoSelecionado,
    quantidadeInput,
    pricepKG,
    finalPrice
  );
  carrinho.push(newcartItem);

  let precoFinalAtual = parseFloat(0);

  if (!carrinho.lastChild) {
    carrinho.forEach((elemento, index) => {
      cartItem.textContent = `Item ${index + 1}: `;

      paragrafo.textContent = elemento.nameProduct;
      document.getElementById("cart").appendChild(paragrafo);

      paragrafo2.textContent = `Quantidade: ${elemento.qtdKG}`;
      document.getElementById("cart").appendChild(paragrafo2);

      paragrafo3.textContent = `Preço por KG: R$ ${elemento.pricepKG}`;
      document.getElementById("cart").appendChild(paragrafo3);

      paragrafo4.textContent = `Preço Total do Item: R$ ${elemento.finalPrice}`;
      document.getElementById("cart").appendChild(paragrafo4);

      precoFinalAtual += parseFloat(elemento.finalPrice);
      let remover = document.getElementById("idFinalTotalPrice");
      if (remover) {
        remover.remove();
      }
    });

    if (finalTotalPrice !== 0) {
      finalTotalPrice.textContent = `Valor total do Pedido: R$ ${precoFinalAtual}`;
      finalTotalPrice.id = "idFinalTotalPrice";
      document.getElementById("cart").appendChild(finalTotalPrice);
    }

    // carrinho.forEach((produto, index) => {
    //   console.log(`Item: ${index + 1}`);
    //   console.log(`Produto: ${produto.nameProduct}`);
    //   console.log(`Quantidade: ${produto.qtdKG}KG`);
    //   console.log(`Preço por KG: R$ ${produto.pricepKG}`);
    //   console.log(`Preço Final: R$ ${produto.finalPrice}`);
    // });
  } else {
    console.log("não leu o array de obj");
  }

  $("#cartModal").modal("hide");

  let delay = 1500;

  let show_alert_success = document.getElementById("show_alert_success");
  show_alert_success.style.display =
    show_alert_success.style.display === "block" ? "none" : "block";

  setTimeout(() => {
    document.getElementById("show_alert_success").style.display = "none";
  }, delay);

  show_alert_success.onclick = () => {
    show_alert_success.style.display =
      show_alert_success.style.display === "block" ? "none" : "block";
  };
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
});
