const cartPage = document.getElementById("cartPage");
const PPic = document.getElementById("PImage");
const idPro = document.getElementById("PID");
const pQt = document.getElementById("PQTY");
const infoP = document.getElementById("PINfo");
const pTotal = document.getElementById("PSUM");


if (JSON.parse(localStorage.getItem("cartListValue")) === null) {
    console.log('nop');
    // Tryiong to get a new line , not works 
    cartPage.textContent = "No Items In Your Shopping" + "\n\n\n" + "Cart";

} else {
    console.log('yp')
    // create the element and append child in the cart 
    const pImage = document.createElement('img');
    PPic.appendChild(pImage);
    const pId = document.createElement('p');
    idPro.appendChild(pId);
    const pInfo = document.createElement('p');
    infoP.appendChild(pInfo);
    const pQty = document.createElement('p');
    pQt.appendChild(pQty);
    const pSum = document.createElement('p');
    pTotal.appendChild(pSum);
    // end  // create the element and append child in the cart
    JSON.parse(localStorage.getItem("cartListValue")).map(data => {
        pId.textContent = data.id;
        // pImage.src =  ; 
        pInfo.textContent = data.name;
        pQty.textContent = data.productCount;
        pSum.textContent = (data.productCount * data.price);


    })



}