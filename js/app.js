// SELETORES
const shopInput = document.querySelector(".shop-input");
const shopButton = document.querySelector(".shop-button");
const shopList = document.querySelector(".shop-list");
const priceContainer = document.querySelector(".price-container");

//Seletores do DarkMode
const toggle = document.querySelector("#toggle");
const areaHeader = document.querySelector(".area-header");
const areaMain = document.querySelector(".area-main");
const areaFooter = document.querySelector(".area-footer");

// EVENTOS
shopButton.addEventListener('click', addItem);
shopList.addEventListener('click', deleteItem);
priceContainer.addEventListener('click', addPrice);

/* ==============================================================*/

// FUNÇÕES
toggle.onclick = function () {
    toggle.classList.toggle('active');
    areaHeader.classList.toggle('active');
    areaMain.classList.toggle('active');
    areaFooter.classList.toggle('active');
    shopButton.classList.toggle('active');
}

function addItem(event) {

    //Prevent form from submitting
    event.preventDefault();

    //VERIFICATION: Campo vazio e entrada vazia
    if (shopInput.value == "" || shopInput.value.trim() == "") {
        window.alert("Item sem descrição! Por favor, informe a descrição do item.");
    } else {

        //ITEM DIV
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        //CHECKBOX
        const checkBox = document.createElement('button');
        checkBox.innerHTML = '<i class="fas fa-check"></i>';
        checkBox.classList.add("checkbox-btn");
        itemDiv.appendChild(checkBox);

        //LI
        const newItem = document.createElement('li');
        newItem.innerText = shopInput.value;
        newItem.classList.add('shop-item');
        itemDiv.appendChild(newItem);

        //INPUT PRICE
        //addPrice();        

        //CHECK TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        itemDiv.appendChild(trashButton);

        //APPEND TO LIST
        shopList.appendChild(itemDiv);

        //CLEAR INPUT
        shopInput.value = "";
    }
}

function deleteItem(e) {
    const item = e.target;
    //DELETE ITEM
    if (item.classList[0] === 'trash-btn') {
        const shop = item.parentElement;
        shop.remove();
    }

    //CHECK MARK
    if (item.classList[0] === 'checkbox-btn') {
        const shop = item.parentElement;
        shop.classList.toggle("checked");
    }
}

function addPrice(e) {

    //Prevent form from submitting
    e.preventDefault();

    //CREATE DIV
    let price = window.prompt("Informe o valor do item: R$ ");
}

