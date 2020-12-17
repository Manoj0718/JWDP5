let total = JSON.parse(localStorage.getItem('Grand Total'));
let responce = JSON.parse(localStorage.getItem("OrderConfirmation"));
let table = document.getElementById('table')
//response DOM
let responseId = document.getElementById("response-id");
let responseName = document.getElementById("response-name");
let responseAddress = document.getElementById('response-Address');
let responseCart = document.getElementById('response-cart');
let responseCity = document.getElementById('response-city');
let responseSecond_name = document.getElementById("Second_name");
let responseEmail = document.getElementById("response-email");
let totalText = document.getElementById("total_text");

window.onload = showResponse();

function showResponse() {
    responseId.textContent = responce.orderId;
    responseName.textContent = responce.contact.firstName;
    responseAddress.textContent = responce.contact.address;
    responseCity.textContent = responce.contact.city;
    responseSecond_name.textContent = responce.contact.lastName;
    responseEmail.textContent = responce.contact.email;
    showTotal();
    showProducts();
}

function showTotal() {
    totalText.innerHTML = total.toFixed(2);
}
function showProducts() {
    for (let i = 0; i < responce.products.length; i++) {
        let name = responce.products[i].name;
        let price = responce.products[i].price;
        let pic = responce.products[i].imageUrl;
        let tr = document.createElement('tr');
        tr.innerHTML = `<td> <img src=${pic} width ="86px" height ="86px">  </td> 
            <td>${name}</td>
             <td>${price}</td>`
        table.appendChild(tr);
    }

}

