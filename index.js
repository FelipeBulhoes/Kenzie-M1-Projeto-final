let captureCardsSpaceUl = document.querySelector(".cardsSpace ul")
let captureCarrinhoUl = document.querySelector(".carrinhoItens ul")



//CRIADOR DE CARDS

function criadorDeCards (array) {
    captureCardsSpaceUl.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        let createCardLi = document.createElement("li");
        captureCardsSpaceUl.appendChild(createCardLi);

        createCardLi.innerHTML = `
            <div class="produtoImg">
                <img src="${array[i].img}" alt="">
            </div>
            <div class="produtoTag">
                <h5>${array[i].tag}</h5>
            </div>
            <section class="produtoInfo">
                <h3>${array[i].nameItem}</h3>
                <p>${array[i].description}</p>
                <span>R$${array[i].value}.00</span>
            </section>
            <div class="addCarrinho">
                <button id="${array[i].id}">Adicionar ao carrinho</button>
            </div>
        `;
    }
}

criadorDeCards(data)



//CRIADOR DE CARDS NO CARRINHO

function criadorDeCardsCarrinho (array) {
    captureCarrinhoUl.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        let createCardLi = document.createElement("li");
        captureCarrinhoUl.appendChild(createCardLi);

        createCardLi.innerHTML = `
            <div class="carrinhoItemImg">
                <img src="${array[i].img}" alt="">
            </div>
            <main>
                <h4>${array[i].nameItem}</h4>
                <span>R$${array[i].value}.00</span>
                <div>
                    <button id="${array[i].id}">Remover produto</button>
                </div>
            </main>
        `;
    }
    
}



//AREA DE BUSCA

let inputText = document.querySelector(".barraPesquisa input");
let inputBtn = document.querySelector(".barraPesquisa button");

inputBtn.addEventListener("click", buscarItem)

function buscarItem () {
    let produtoBuscado = [];
    console.log(inputText.value);
    for (let i = 0; i < data.length; i++) {
        if (data[i].nameItem == inputText.value) {
            produtoBuscado.push(data[i]);

            criadorDeCards(produtoBuscado);
        } else if (data[i].tag == inputText.value) {
            produtoBuscado.push(data[i]);

            criadorDeCards(produtoBuscado);
        }
    }
}

let headerTodosBtn = document.querySelector(".todos");
let headerAcessoriosBtn = document.querySelector(".acec");
let headerCamisetasBtn = document.querySelector(".cami");
let headerCalcasBtn = document.querySelector(".calc");

headerTodosBtn.addEventListener("click", mostrarTodos);
headerAcessoriosBtn.addEventListener("click", filtrar);
headerCamisetasBtn.addEventListener("click", filtrar);
headerCalcasBtn.addEventListener("click", filtrar);

function mostrarTodos (event) {
    event.preventDefault();
    criadorDeCards(data)
}

function filtrar (event) {
    event.preventDefault();
    let arrayAcec = [];
    let arrayCami = [];
    let arrayCalc = [];
    if (event.target.className == "acec") {
        for (let i = 0; i < data.length; i++) {
            if (data[i].tag == "Acessórios") {
                arrayAcec.push(data[i]);
            }
        }
        criadorDeCards(arrayAcec);    
    } else if (event.target.className == "cami") {
        for (let i = 0; i < data.length; i++) {
            if (data[i].tag == "Camisetas") {
                arrayCami.push(data[i]);
            }
        }
        criadorDeCards(arrayCami);
    } else if (event.target.className == "calc") {
        for (let i = 0; i < data.length; i++) {
            if (data[i].tag == "Calças") {
                arrayCalc.push(data[i]);
            }
        }
        criadorDeCards(arrayCalc);
    } 
}



//ADICIONAR PRODUTOS NO CARRINHO

captureCardsSpaceUl.addEventListener("click", addProdutosCarrinho);

let qtdNumb = document.querySelector(".qtdNumb");
let totalCost = document.querySelector(".totalCost");

let arrayProdutosCarrinho = [];

function addProdutosCarrinho (event) {
    let addBtn = event.target;
    if (addBtn.tagName == "BUTTON") {
        let produtoAdicionado = event.target.id;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == produtoAdicionado) {
                arrayProdutosCarrinho.push(data[i])
                console.log(arrayProdutosCarrinho)
            }
        }
        criadorDeCardsCarrinho(arrayProdutosCarrinho);
        
        qtdNumb.innerText = contadorItens();
        totalCost.innerText = `R$${somadorValor(arrayProdutosCarrinho)}.00`
    };
}



//RETIRAR PRODUTO DO CARRINHO

captureCarrinhoUl.addEventListener("click", removerProduto);

function removerProduto (event) {
    let removeBtn = event.target;
    if (removeBtn.tagName == "BUTTON") {
        let produtoRetirado = event.target.id;
        for (let i = 0; i < arrayProdutosCarrinho.length; i++) {
            if (arrayProdutosCarrinho[i].id == produtoRetirado) {
                arrayProdutosCarrinho.splice(i, 1);
            }
        }
        criadorDeCardsCarrinho(arrayProdutosCarrinho);
        qtdNumb.innerText = contadorItens();
        totalCost.innerText = `R$${somadorValor(arrayProdutosCarrinho)}.00`
    }
}



// CONTADOR DE ITENS E SOMADOR DE VALOR

function contadorItens () {
    let qtdProdutosNoCarrinho = arrayProdutosCarrinho.length;
    return qtdProdutosNoCarrinho
}

function somadorValor (array) {
    let soma = 0;
    for (let i = 0; i < array.length; i++) {
        soma = soma + array[i].value;
    }
    return soma
}



