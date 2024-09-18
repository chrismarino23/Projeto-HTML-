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

const changeMenuBtn = () => {
  if (textoAtual === "Menu") {
    btnHamb.textContent = "close";
    textoAtual = "close";
  } else {
    btnHamb.textContent = "Menu";
    textoAtual = "Menu";
  }

  navHamb.style.display = navHamb.style.display === "block" ? "none" : "block";
};
btnHamb.addEventListener("click", () => {
  changeMenuBtn();
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
      show_cart_BG();
      changeMenuBtn();
    };

    const mostraCarrinho_disp_maiores = document.getElementById(
      "mostraCarrinho_disp_maiores"
    );

    //verifica se ta vazio pra mostrar BG do carrinho
    show_cart_BG();
    mostraCarrinho_disp_maiores.onclick = () => {
      show_cart_BG();
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

  let valuePrice = document.getElementById("valuePrice").innerText;
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
var products_order = [];

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
        document.getElementById("produtoSelecionado").innerText;

      let quantidadeInput = document.getElementById("quantidade").value;

      let finalPrice = parseFloat(
        document.getElementById("newPrice").innerText
      ).toFixed(2);

      if (isNaN(finalPrice)) {
        let oldPrice = parseFloat(
          document.getElementById("valuePrice").innerText
        );
        finalPrice = oldPrice.toString().replace(".", ",");
      }

      let pricepKG = finalPrice / quantidadeInput;

      finalPrice = (quantidadeInput * pricepKG).toString().replace(".", ",");

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

      // let p_cart_price = document.querySelector(".p_cart_price").innerText;
      // if (p_cart_price) {
      //   p_cart_price.innerText = p_cart_price.toString().replace(".", ",");
      // }
      // console.log(p_cart_price);

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
        const clean_OrderList = document.querySelectorAll(".width50prct");

        clean_OrderList.forEach((element) => {
          element.remove();
        });

        licart.remove();

        const index = carrinho.findIndex((item) => item.id === productId);

        if (index > -1) {
          carrinho.splice(index, 1);
          products_order.splice(index, 1);
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
        verifyCartWarn();
        show_cart_BG();
      };
    }

    let finalPrice = parseFloat(
      document.getElementById("newPrice").innerText
    ).toFixed(2);

    finalPrice = finalPrice.toString().replace(".", ",");

    if (isNaN(finalPrice)) {
      let oldPrice = parseFloat(
        document.getElementById("valuePrice").innerText
      ).toFixed(2);
      finalPrice = oldPrice.toString().replace(".", ",");
    }

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

    document.getElementById("catalog").style.display = "none";
    document.getElementById("conferirPedido").style.display = "block";

    $("#offcanvasRight").offcanvas("hide");

    check_Cart = document.getElementById("check_Cart");

    products_order = copiarEVerificar(carrinho, products_order);

    for (let i = 0; i < products_order.length; i++) {
      const element = products_order[i];

      // Verifica se o produto já está no DOM
      const productInOrder = document.querySelector(
        `#check_Cart li[data-id="${element.id}"]`
      );

      if (!productInOrder) {
        // Cria um novo elemento <li>
        const li_check_order = document.createElement("li");
        li_check_order.classList.add("li_order_list");
        li_check_order.classList.add("width50prct");
        li_check_order.setAttribute("data-id", element.id); // Adiciona um atributo data-id para identificação

        element.finalPrice = parseFloat(element.finalPrice).toFixed(2);
        element.finalPrice = element.finalPrice.toString().replace(".", ",");
        // Define o conteúdo HTML do <li>
        li_check_order.innerHTML = `
          <div class="div_img_order">
            <img class="img_product" src="${element.url}" alt="Produto ${element.id}">
          </div>
          <div class="div_body_order">
            <h5 class="product_name_order">${element.nameProduct}</h5>
            <p id="id_p_check_order">Código: ${element.id}</p>
            <span class="span_product_order">
              Preço:
              <strong>
                <p class="p_cart_price">R$ ${element.finalPrice}</p>
              </strong>
            </span>
            <div class="div_cart_footer_order">
              <div class="qtd_input_order">
                <label class="lbl_input" for="input_produto">Quantidade: </label>
                <div class="div_footer_product">
                  <input class="input_produto input_produto_cart_order" type="text" value="${element.qtdKG}" name="input_produto" disabled>
                </div>
                <small class="message_order">KG (s)</small>
              </div>
            </div>
          </div>`;

        // Adiciona o <li> ao elemento pai
        check_Cart.appendChild(li_check_order);
      }
    }
  };
  document.getElementById("btn_sent_order").onclick = () => {
    var finalCart = JSON.parse(localStorage.getItem("carrinho"));

    if (products_order.length > 0) {
      let mensagem =
        "Olá vim pelo site do Divino Sabor da Alice, e gostaria de fazer o pedido abaixo:\n";

      finalCart.forEach((produto) => {
        mensagem += `\n${produto.nameProduct}\n
      \n- Quantidade: ${produto.qtdKG}KG\n
      \n- Link da imagem: ${produto.url}\n`;
      });
      const mensagemCodificada = encodeURIComponent(mensagem);

      const numeroTelefone = "5511961944937";

      var urlWhatsApp = `https://api.whatsapp.com/send?1=pt_BR&phone=${numeroTelefone}&text=${mensagemCodificada}`;

      setTimeout(() => {
        window.open(urlWhatsApp, "_blank");
      }, 3000);
      // console.log(urlWhatsApp);

      products_order = [];
      carrinho = [];

      const finished_order = document.querySelectorAll(".li_order_list");
      const finished_cart = document.querySelectorAll(".li_cart_list");
      // finished_order.forEach((element) => {
      //   element.remove();
      // });

      for (let i = 0; i < finished_cart.length; i++) {
        const element = finished_cart[i];
        element.remove();

        const element_order = finished_order[i];
        element_order.remove();
      }
      if (products_order.length === 0) {
        show_order_BG();
      }
    } else {
      ToastWarning("Pedido vazio, verifique o carrinho", 3000);
      // alert("Por favor, adicione itens ao seu pedido!");
    }
  };
}
if (
  window.location.pathname === "/produtos.html" ||
  window.location.pathname === "/Projeto-HTML-/produtos.html"
) {
  document.getElementById("btn_back_check_order").onclick = () => {
    document.getElementById("catalog").style.display = "";
    document.getElementById("conferirPedido").style.display = "none";

    remover_order_list();
    if (products_order.length === 0) {
      show_order_BG();
    }
  };
}

const show_order_BG = () => {
  const empty_order_bg = document.querySelector(".empty_order_bg");

  setTimeout(() => {
    empty_order_bg.style.display =
      empty_order_bg.style.display === "block" ? "none" : "block";
  }, 5000);
};

const remover_order_list = () => {
  let rmv_li_content = document.querySelectorAll(".width50prct");
  rmv_li_content.forEach((element) => {
    element.remove();
  });
};

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

const show_cart_BG = () => {
  const offCanvasFooter = document.getElementById("offcanvas_footer");

  if (carrinho != 0) {
    document.getElementById("emptyCart").style.display = "none";
    offCanvasFooter.style.display = "block";
  } else {
    document.getElementById("emptyCart").style.display = "block";
    offCanvasFooter.style.display = "none";
  }
};

if (
  window.location.pathname === "/produtos.html" ||
  window.location.pathname === "/Projeto-HTML-/produtos.html"
) {
  const clean_cart = document.getElementById("clean_cart");

  clean_cart.onclick = () => {
    carrinho = [];
    newcartItem = [];
    products_order = [];
    json_carrinho = JSON.stringify(carrinho);
    localStorage.setItem("carrinho", json_carrinho);
    show_cart_BG();

    del_li_order_list();

    verifyCartWarn();

    const clean_li_cart = document.querySelectorAll(".li_cart_list");

    clean_li_cart.forEach((element) => {
      element.remove();
    });

    if (products_order.length === 0) {
      show_order_BG();
    }
  };

  function copiarEVerificar(carrinho, products_order) {
    function idExiste(id) {
      return products_order.some((produto) => produto.id === id);
    }

    carrinho.forEach((produto) => {
      if (idExiste(produto.id)) {
        let att_order_li = document.querySelector(".width50prct");
        if (att_order_li) {
          att_order_li.remove();
        }
      }
    });

    carrinho.forEach((produto) => {
      if (!idExiste(produto.id)) {
        products_order.push(produto);
      }
    });

    return products_order;
  }

  //clean all itens from cart or order_list
  const del_li_order_list = () => {
    let divToRemove = document.querySelectorAll(".li_order_list");
    divToRemove.forEach((element) => {
      element.remove();
    });
  };
}
