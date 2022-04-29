// SELETORES
const shopInput = document.querySelector(".shop-input");
const shopButton = document.querySelector(".shop-button");
const shopList = document.querySelector(".shop-list");
const shopFilter = document.querySelector('.shop-filter');

//Seletores do DarkMode
const toggle = document.querySelector('#toggle');
const areaHeader = document.querySelector('.area-header');
const areaMain = document.querySelector('.area-main');
const areaFooter = document.querySelector('.area-footer');
const select = document.querySelector('.select');

// EVENTOS
document.addEventListener('DOMContentLoaded', getItems);
shopButton.addEventListener('click', addItem);
shopList.addEventListener('click', deleteItem);
shopFilter.addEventListener('click', filterShop);

/* ==============================================================*/

//Botão DARK-MODE
toggle.onclick = function (event) {
    //Prevent form from submitting
    event.preventDefault();

    toggle.classList.toggle('active');
    areaHeader.classList.toggle('active');
    areaMain.classList.toggle('active');
    areaFooter.classList.toggle('active');
    shopButton.classList.toggle('active');
    select.classList.toggle('active');
}

function addItem(event) {

    //Prevent form from submitting
    event.preventDefault();

    //VERIFICAÇÃO: Campo vazio e entrada vazia
    if (shopInput.value == "" || shopInput.value.trim() == "") {
        window.alert("Item sem descrição! Por favor, informe a descrição do item.");
    } else {

        //ITEM DIV
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        //Criando CHECKBOX
        var checkBox = document.createElement('button');
        checkBox.innerHTML = '<i class="fas fa-check"></i>';
        checkBox.classList.add("checkbox-btn");
        itemDiv.appendChild(checkBox);

        //Criando LI
        const newItem = document.createElement('li');
        newItem.innerText = shopInput.value;
        newItem.classList.add('shop-item');
        itemDiv.appendChild(newItem);

        /* ======= Adicionando os itens no LocalStorage ======= */
        saveItemLocal(shopInput.value);

        //Criando TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        itemDiv.appendChild(trashButton);

        //APPEND TO LIST
        shopList.appendChild(itemDiv);

        //LIMPAR INPUT
        shopInput.value = "";
    }
}

/* ================================================*/

//Função DELETAR ITEM
function deleteItem(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const shop = item.parentElement;

        //Animação
        shop.classList.add("moved");
        removeLocalItems(item);
        shop.addEventListener('transitionend', function () {
            shop.remove();
        })
    }

    //CHECK MARK
    if (item.classList[0] === 'checkbox-btn') {
        const shop = item.parentElement;
        shop.classList.toggle("checked");
    }
}

//Filtro para exibir ‘Todos os itens’, ‘Comprados’, ‘Pendentes’.
function filterShop(e) {
    const shops = shopList.childNodes;
    shops.forEach(function (item) {
        switch (e.target.value) {
            case "todos":
                item.style.display = 'flex';
                break;
            case "comprados":
                if (item.classList.contains('checked')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;

            case "pendentes":
                if (!item.classList.contains('checked')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }

                break;
        }
    });
}

//Salvar Itens no Armazenamento Local
function saveItemLocal(item) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

//Pegar item do Local Storage
function getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.forEach(function (item) {
        //ITEM DIV
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        //Criando CHECKBOX
        const checkBox = document.createElement('button');
        checkBox.innerHTML = '<i class="fas fa-check"></i>';
        checkBox.classList.add("checkbox-btn");
        itemDiv.appendChild(checkBox);

        //Criando LI
        const newItem = document.createElement('li');
        newItem.innerText = item;
        newItem.classList.add('shop-item');
        itemDiv.appendChild(newItem);

        //Criando TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        itemDiv.appendChild(trashButton);

        //APPEND TO LIST
        shopList.appendChild(itemDiv);
    });
}

//Remover item do Local Storage
function removeLocalItems(item) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    const itemIndex = item.children[0].innerText;
    items.splice(items.indexOf(itemIndex), 1);
    localStorage.setItem('items', JSON.stringify(items));
}