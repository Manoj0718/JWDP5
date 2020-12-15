let cart = JSON.parse(localStorage.getItem('productArray')) || [];

// /--------updateing cart counter----/
const cartCountDom = document.getElementById("cart_count"); /* cart count */
cartCountDom.textContent = cart.length;

// /-------table----/

let shoppingTable = document.getElementById("shopping_cart_table")
let totalColumn = document.getElementById("total_column");

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
        totalColumn.innerHTML =
            `<h4 class="text-uppercase text-success"> no items in the cart,go to our
      <a href="#" class="stretched-link text-danger">SHOP</a>
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
    if ($event.target && $event.target.classList.contains("input_value")) {
        let targetValue = $event.target.value;
        targetValue = parseInt(targetValue);
        let ItemName = $event.target.dataset.name;
        let Itemlense = $event.target.dataset.lense;
        const updateingItem = cart.find(item => item.name === ItemName && Itemlense == item.lense);
        updateingItem.qty = targetValue;
        updateingItem.total = updateingItem.qty * parseInt(updateingItem.price);
        localStorage.setItem("productArray", JSON.stringify(cart));
        //location.reload();
    }
    totalCost();
};
//------------------------------------------------
// update Total cost

function totalCost() {
    let sum = cart.map(o => o.total).reduce((a, c) => { return a + c });
    grandTotal.textContent = "$" + " " + sum.toFixed(2);
};

//----------------------------------
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

//response DOM
let responseId = document.getElementById("response-id");
let responseName = document.getElementById("response-name");
let responseAddress = document.getElementById('response-Address');
let responseCart = document.getElementById('response-cart');
let responseCity = document.getElementById('response-city');
let responseSecond_name = document.getElementById("Second_name");
let responseMassage = document.getElementById("response-massage");
let responseEmail = document.getElementById("response-email");
//------------------------------------------------------------
// JSON request containing a contact object and a products array
//{contact : {contact}, cart:[{cart 01}, {cart 02}]}
//------------------------------------------------------------

submit_button.addEventListener('click', ($event) => {
    $event.preventDefault();

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
        products: cartIds
    }
    //console.log(postSubmit);
    contactForm(postSubmit);
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

        //JSON request containing a contact object and a
        //products array
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
        // postSubmit argument
        const promiserequest = makeRequest(postSubmit);
        const response = await promiserequest;
        console.log(response);
        console.log(response.products);
        responseId.textContent = "Here is youe order No : " + response.orderId;
        responseName.textContent = "Customer First name : " + postSubmit.contact.firstName;
        responseSecond_name.textContent = "Customer second name : " + postSubmit.contact.lastName;
        responseAddress.textContent = "Customer addres: " + postSubmit.contact.address;
        responseCity.textContent = "Customer city: " + postSubmit.contact.city;
        responseEmail.textContent = "Customer Email : " + postSubmit.contact.email;
        responseMassage.textContent = response.contact.products;
        console.log(response.products);
        for (let i in response.products) {
            console.log(i.name);
        }

    }
    catch (errorMassage) {
        responseMassage.textContent = errorMassage;
        console.log(errorMassage);
    }
};


