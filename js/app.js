// SELETORES
const shopInput = document.querySelector(".shop-input");
const shopButton = document.querySelector(".shop-button");
const shopList = document.querySelector(".shop-list");

// EVENTOS
shopButton.addEventListener('click', addItem);
shopList.addEventListener('click', deleteItem);

// FUNÇÕES
function addItem(event) {

    //Prevent form from submitting
    event.preventDefault();

    //ITEM DIV
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<input type="checkbox">';
    completedButton.classList.add("complete-btn");
    itemDiv.appendChild(completedButton);

    //LI
    const newItem = document.createElement('li');
    newItem.innerText = shopInput.value;
    newItem.classList.add('shop-item');
    itemDiv.appendChild(newItem);

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

function deleteItem(e) {
    const item = e.target;
    //DELETE ITEM
    if(item.classList[0] === 'trash-btn'){
        const shop = item.parentElement;
        shop.remove();
    }
    
    //CHECK MARK
    if(item.classList[0] === 'complete-btn'){
        const shop = item.parentElement;
        shop.classList.toogle('completed');
    }
}