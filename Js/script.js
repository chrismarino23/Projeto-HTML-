const btnHamb = document.getElementById("btnHamb");
const navHamburguer = document.getElementById("navHamburguer");

// API G-Maps autentication
((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyCxJwcxayw_XgaRL3sY6gv-r7Eucs7bA8o",
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

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

let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -23.16739, lng: -46.90649 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Divino Sabor da Alice",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname === "/onde-encontrar.html" ||
    window.location.pathname === "/Projeto-HTML-/onde-encontrar.html"
  ) {
    initMap();
  }

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
  if (
    window.location.pathname === "/produtos.html" ||
    window.location.pathname === "/Projeto-HTML-/produtos.html"
  ) {
    const mostraCarrinho = document.getElementById("mostraCarrinho");
    mostraCarrinho.onclick = () => {
      showFinishbtn();
    };
    //close cart's modal at products screen.
    btn_fechar_modal_cart_x.addEventListener("click", () => {
      resetNewPrice();
    });
    btn_fechar_modal_cart.addEventListener("click", () => {
      resetNewPrice();
    });
    verifyCartWarn();
  }
});

//Modal add to cart

function abrirModal(idRecebido, img, produto, price) {
  let searchProduct = carrinho.find((produto) => produto.id === idRecebido);

  if (searchProduct) {
    ToastWarning("Este produto já está no carrinho!", 2000);
  } else {
    let idModalProduct = document.getElementById("idModalProduct");
    idModalProduct.innerText = idRecebido;
    let imagem = document.getElementById("imgSelecionada");
    imagem.src = img;
    imagem.style.width = "200px";
    imagem.style.height = "200px";
    document.getElementById("produtoSelecionado").innerText = `${produto}`;
    document.getElementById("quantidade").value = 1;
    const precoToNumber = parseFloat(price);
    const precoFormatado = precoToNumber.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    document.getElementById("valuePrice").innerText = `${precoFormatado}`;

    $("#cartModal").modal("show");
    document.getElementById("newPrice").style.display = "none";
    document.getElementById("valuePrice").style.display = "";
  }
}

const resetNewPrice = () => {
  $("#cartModal").modal("hide");

  let newPrice = document.getElementById("newPrice");
  newPrice.innerText = "";
  newPrice.style.display = "none";

  document.getElementById("valuePrice").style.display = "";
};

function alterarQuantidade(delta) {
  let quantidadeInput = document.getElementById("quantidade");
  let quantidade = parseInt(quantidadeInput.value);

  quantidade = Math.max(1, quantidade + delta); // Garante que a quantidade mínima é 1
  quantidadeInput.value = quantidade;

  let valuePrice = document.getElementById("valuePrice").textContent;
  let price = parseFloat(valuePrice);

  document.getElementById("valuePrice").style.display = "none";

  let newPrice = parseFloat(price * quantidade).toFixed(2);

  const newFormatedPriceFront = parseFloat(newPrice).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let newPriceFront = document.getElementById("newPrice");
  newPriceFront.innerText = `${newFormatedPriceFront}`;
  newPriceFront.style.display = "";
}

var carrinho = [];

class ConstructCar {
  constructor(url, id, nameProduct, qtdKG, pricepKG) {
    this.url = url;
    this.id = id;
    this.nameProduct = nameProduct.toString();
    this.qtdKG = parseInt(qtdKG);
    this.pricepKG = parseFloat(pricepKG).toFixed(2);
    this.finalPrice = parseFloat(qtdKG * pricepKG).toFixed(2);
  }
}

const btnAddtoCart = document.querySelectorAll(".btn_Produto");

btnAddtoCart.forEach((btnClicked) => {
  btnClicked.onclick = () => {
    const productId = document.getElementById("idModalProduct").innerText;

    const produtoNoCarrinho = carrinho.find((item) => item.id === productId);

    if (produtoNoCarrinho) {
      ToastWarning("Este produto já está no carrinho!", 2000);
    } else {
      let urlFront = document.getElementById("imgSelecionada").src;

      let produtoSelecionado =
        document.getElementById("produtoSelecionado").textContent;

      let quantidadeInput = document.getElementById("quantidade").value;

      let finalPrice = parseFloat(
        document.getElementById("newPrice").textContent
      );

      // let precoFinalAtual = parseFloat(0);

      if (isNaN(finalPrice)) {
        let oldPrice = parseFloat(
          document.getElementById("valuePrice").textContent
        );
        finalPrice = oldPrice;
      }

      let pricepKG = finalPrice / quantidadeInput;

      finalPrice = quantidadeInput * pricepKG;

      const newProductID = productId;

      const newcartItem = new ConstructCar(
        urlFront,
        newProductID,
        produtoSelecionado,
        quantidadeInput,
        pricepKG,
        finalPrice
      );

      carrinho.push(newcartItem);

      ToastSuccess("O Produto foi adicionado ao carrinho!", 2000, "#2E8B57");
      const licart = document.createElement("li");
      licart.classList.add("li_cart_list");

      licart.innerHTML = `<div class="div_img_cart">
          <img class="img_product" src="${newcartItem.url}" alt="Produto ${newcartItem.id}">
        </div>
        <div class="div_body">
          <h5 class="product_name">${newcartItem.nameProduct}</h5>
          <span class="span_product">
              Preço:
                <strong>
                  <p class="p_cart_price">R$ ${newcartItem.finalPrice}</p>
                </strong>
          </span>
        </div>
        <div class="div_cart_footer">
          <div class="qtd_input">
              <label class="lbl_input" for="input_produto">Quantidade</label>
              <div class="div_footer_product">
                  <button class="btn_Produto btn_Produto_remove">-</button>
                  <input class="input_produto input_produto_cart" type="text" value="${newcartItem.qtdKG}" name="input_produto" disabled>
                  <button class="btn_Produto btn_Produto_add">+</button>
              </div>
              <small class="message">KG (s)</small>
          </div>
        </div>
        <div class="div_removeBtn">
          <button id="trash_icon_remove" class="btn_Produto color_red"><span class="material-symbols-outlined">
        delete_forever
        </span></button>
        </div>`;

      document.querySelector(".cart_list").appendChild(licart);

      verifyCartWarn();

      // Adiciona os eventos para os botões dentro do item adicionado ao carrinho
      const btnAdd = licart.querySelector(".btn_Produto_add");
      const btnRemove = licart.querySelector(".btn_Produto_remove");
      const inputNumero = licart.querySelector(".input_produto_cart");
      const pCartPrice = licart.querySelector(".p_cart_price");

      btnAdd.onclick = () => {
        let qtd = parseInt(inputNumero.value) + 1;
        inputNumero.value = qtd;
        atualizarPreco(newcartItem, qtd, pCartPrice);
      };

      btnRemove.onclick = () => {
        let qtd = parseInt(inputNumero.value);
        if (qtd > 1) {
          qtd--;
          inputNumero.value = qtd;
          atualizarPreco(newcartItem, qtd, pCartPrice);
        }
      };

      const btnRemoveCart = licart.querySelector(".color_red");
      btnRemoveCart.onclick = () => {
        licart.remove();

        const index = carrinho.findIndex((item) => item.id === productId);

        if (index > -1) {
          carrinho.splice(index, 1);
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
        verifyCartWarn();
        showFinishbtn();
      };
    }

    // let quantidadeInput = document.getElementById("quantidade").value;

    let finalPrice = parseFloat(
      document.getElementById("newPrice").textContent
    );

    if (isNaN(finalPrice)) {
      let oldPrice = parseFloat(
        document.getElementById("valuePrice").textContent
      );
      finalPrice = oldPrice;
    }

    // let pricepKG = finalPrice / quantidadeInput;

    $("#cartModal").modal("hide");

    verifyCartWarn();

    document.getElementById("newPrice").innerText = "";
  };
});

if (
  window.location.pathname === "/produtos.html" ||
  window.location.pathname === "/Projeto-HTML-/produtos.html"
) {
  document.getElementById("btn_finaliza_compra").onclick = () => {
    let json_carrinho = JSON.stringify(carrinho);

    localStorage.setItem("carrinho", json_carrinho);
  };
}

function atualizarPreco(produto, qtd, pCartPrice) {
  const trataPrice = produto.pricepKG;
  const precoFormatado = parseFloat(trataPrice.replace(",", ".")).toFixed(2);
  const novoPreco = precoFormatado * qtd;
  pCartPrice.innerText = `R$ ${novoPreco.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  let findproduct = carrinho.find((item) => item.id === produto.id);

  if (findproduct) {
    produto.finalPrice = novoPreco;
    produto.qtdKG = qtd;
  } else {
    console.log("produto não encontrado no carrinho!");
  }
}
if (
  window.location.pathname === "/produtos.html" ||
  window.location.pathname === "/Projeto-HTML-/produtos.html"
) {
  function verifyCartWarn() {
    carrinho.length >= 1
      ? (warning_cart = document.getElementById("warning_cart").style.display =
          "")
      : (warning_cart = document.getElementById("warning_cart").style.display =
          "none");
  }
}
function ToastSuccess(message, time, color) {
  Toastify({
    text: message,
    duration: time,
    close: true,
    position: "left",
    gravity: "top", // `top` or `bottom`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: color,
      borderRadius: "10px",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function ToastWarning(message, time) {
  Toastify({
    text: message,
    duration: time,
    position: "left",
    style: {
      borderRadius: "10px",
      background: "red",
    },
    // className: "class_toast",
    stopOnFocus: false,
    close: true,
    onClick: function () {}, // Callback after click
  }).showToast();
}

function generateProductId() {
  // Gera uma parte aleatória do ID
  const randomPart = Math.random().toString(36).substring(2, 9);
  // Gera uma parte baseada no timestamp atual
  const timestampPart = Date.now().toString(36);
  // Combina as duas partes para formar o ID único
  return `${timestampPart}-${randomPart}`;
}

const showFinishbtn = () => {
  const offCanvasFooter = document.getElementById("offcanvas_footer");

  if (carrinho == false) {
    ToastWarning("O carrinho está vazio!", 2000);
    $("#offcanvasRight").offcanvas("hide");
    offCanvasFooter.style.display = "none";
  } else {
    offCanvasFooter.style.display = "block";
  }
};

const clean_cart = document.getElementById("clean_cart");

if (
  window.location.pathname === "/produtos.html" ||
  window.location.pathname === "/Projeto-HTML-/produtos.html"
) {
  clean_cart.onclick = () => {
    carrinho = [];
    newcartItem = [];
    json_carrinho = JSON.stringify(carrinho);
    localStorage.setItem("carrinho", json_carrinho);

    let divToRemove = document.querySelectorAll(".li_cart_list");
    divToRemove.forEach((element) => {
      element.remove();
    });
    showFinishbtn();
    verifyCartWarn();
  };
}
