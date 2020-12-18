// const { parse } = require("uuid");

let cart = JSON.parse(localStorage.getItem('productArray')) || [];

// /--------updateing cart counter----/
const cartCountDom = document.getElementById("cart_count"); /* cart count */
cartCountDom.textContent = cart.length;

// /-------table----/

let shoppingTable = document.getElementById("shopping_cart_table")
let totalColumn = document.getElementById("total_column");
let text = document.getElementById('text');

//<//--updateing total prize->//

let grandTotal = document.getElementById('Grand_Total');

//<-- function for quentity updater and remove buttons//->

let remove_button = document.getElementsByClassName("remove");
let empty_Button = document.getElementsByClassName("btn-warning");

// quentity input

let quentity = document.getElementsByClassName("input_value");

// </--start table --/>

window.onload = showpage();

function showpage() {
    if (cart.length === 0) {
        shoppingTable.style.visibility = 'hidden';
        text.innerHTML =
            `<h4 class="text-uppercase text-center"> no items in the cart,go to our
      <a href="http://127.0.0.1:5500/html_pages/All_Product.html" class="stretched-link text-danger">SHOP</a>
     </p> </h4 > `

    } else {
        // creating the table 
        cart.forEach(function (object) {
            let objectTotal = object.total;
            objectTotal = objectTotal.toFixed(2);
            let tr = document.createElement('tr');
            tr.innerHTML = `<td> <img src=${object.pic} width ="86px" height ="86px">  </td> 
            <td> ${object.name}- ${object.lense} </td>
            <td class="productPrice">${object.price}</td>  
            <td> <input type="number" class="input_value" data-name="${object.name}" data-lense="${object.lense}" value=${object.qty} min="1"></td >
            <button type="button" class="btn btn-danger m-1 remove" data-name="${object.name}" data-lense="${object.lense}">Remove</button>
            <td>$ ${objectTotal}</td>`;
            shoppingTable.appendChild(tr);
        });
    }
}


// ------------------------------
// update quentity

shoppingTable.onchange = function ($event) {
    let updateingItem;
    if ($event.target && $event.target.classList.contains("input_value")) {
        let targetValue = $event.target.value;
        targetValue = parseInt(targetValue);
        let ItemName = $event.target.dataset.name;
        let Itemlense = $event.target.dataset.lense;
        updateingItem = cart.find(item => item.name === ItemName && Itemlense == item.lense);
        updateingItem.qty = targetValue;
        let itemText = $event.target.parentElement.parentElement.lastChild;
        updateingItem.total = updateingItem.qty * parseInt(updateingItem.price);
        itemText.textContent = "$" + updateingItem.total.toFixed(2);
        localStorage.setItem("productArray", JSON.stringify(cart));

    }
    totalCost();
};
//------------------------------------------------
// update Total cost
function totalCost() {
    let sum = cart.map(o => o.total).reduce((a, c) => { return a + c });
    grandTotal.textContent = "$" + " " + sum.toFixed(2);
    localStorage.setItem("Grand Total", sum.toFixed(2));
    //     
};
//-------------------------------------------------------------------------------------------
//------------- start remove button ---------------//
shoppingTable.onclick = function (event) {
    if (event.target && event.target.classList.contains('remove')) {
        let removeItem = event.target.dataset.name;
        let removelense = event.target.dataset.lense;
        let parentElement = event.target.parentElement;
        let indexNo = cart.findIndex(item => (removelense == item.lense) && (removeItem == item.name));
        console.log(indexNo); // we know the index
        const sameItem = cart.splice(indexNo, 1);
        console.log(sameItem);
        console.log("parent Element", parentElement);
        console.log("updated cart", cart);
        localStorage.setItem("productArray", JSON.stringify(cart));
        parentElement.parentNode.removeChild(parentElement);
        totalCost();
    }

};
//-----------------------------finish remove button----------------------------------------------
// remove button fuction

function emptyCart() {
    localStorage.clear();
    // reload /refresh page
    location.reload();
};

// /-----<<<< form validation>>>>---////------------------------------------------------------------------------------------------------------------

const url = "http://localhost:3000/api/cameras";
let firstName = document.getElementById("input_Name");
let lastname = document.getElementById("input_Last_Name");
let address = document.getElementById("input_Address");
let addressSecondLine = document.getElementById("input_Address2");
let city = document.getElementById("inputCity");
let zip = document.getElementById("inputZip");
let submit_button = document.getElementById("submit_button");
let email = document.getElementById("exampleInputEmail1");

//------------------------------------------------------------
// JSON request containing a contact object and a products array
//{contact : {contact}, cart:[{cart 01}, {cart 02}]}
//------------------------------------------------------------

submit_button.addEventListener('click', ($event) => {
    $event.preventDefault();
    localStorage.removeItem('productArray'); // submit click remove cart

    let cartIds = cart.map(x => x._id);
    // console.log(cartIds);
    const postSubmit = {
        contact: {
            firstName: firstName.value,
            lastName: lastname.value,
            address: address.value + addressSecondLine.value,
            city: city.value,
            email: email.value,
        },
        orderId: "",
        products: cartIds,
    }
    //console.log(postSubmit);
    contactForm(postSubmit);
    //window.location.replace("http://127.0.0.1:5500/html_pages/customer_thank.html"); return false;
});

function makeRequest(data) {
    return new Promise((resolve, rejection) => {
        let postRequest = new XMLHttpRequest();
        postRequest.open("POST", url + '/order');

        postRequest.onreadystatechange = () => {
            if (postRequest.readyState === 4) {
                if (postRequest.status === 201) {
                    let re = resolve(JSON.parse(postRequest.response));
                } else {
                    rejection(JSON.parse(postRequest.response));
                    console.log('failed', postRequest.status);
                }
            }
        };
        //JSON request containing a contact object and a products array
        postRequest.setRequestHeader('Content-Type', 'application/json');
        postRequest.send(JSON.stringify(data));
    });
};
//------------------------------------
// Returns contact object, products array and orderId (string)
//{ orderId: string, contact : { contact }, cart: [cart] }
//{ message: string, contact: { name: string, second_name: string, address: string, city: string}, cart:[ {cartItem}, {cart item}] }

async function contactForm(postSubmit) {
    try {
        // postSubmit argument &   set in localstorage
        const promiserequest = makeRequest(postSubmit);
        const response = await promiserequest;
        console.log(response);
        let orderConfirmation = JSON.stringify(response);
        localStorage.setItem("OrderConfirmation", orderConfirmation);
    }
    catch (errorMassage) {
        responseMassage.textContent = errorMassage;
        console.log(errorMassage);
    }
    window.location.replace("http://127.0.0.1:5500/html_pages/customer_thank.html"); return false;

};



