/* cart count */
const cartCountDom = document.getElementById("cart_count");
cartCountDom.style.color = "#F6EDD8";
cartCountDom.classList.add('text-decoration-none');
const singleProductLenses = document.getElementById("lensessell");

// add to cart button--------------------------------------------------

const addToCartButtonDom = document.getElementById("buy_Button");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const urlstring = "http://localhost:3000/api/cameras/" + id;

// product show case ids---------------------------------------------

const singleProductName = document.getElementById('single_Product_Name');
const singleProductPic = document.getElementsByClassName("card-img");
const textProduct = document.getElementById("text_Product");
const singleProductPrice = document.getElementById('Product_Price');
const pageTiltle = document.getElementById('page_Name');
const singlePic = document.getElementById("image");

// retrieve current cart if it exists. If it doesn't create an empty cart array

let cart = JSON.parse(localStorage.getItem('productArray')) || [];
cartCountDom.innerHTML = cart.length;
const cartItem = {
    _id: id,
    pic: singlePic.src,
    name: singleProductName.textContent,
    qty: 0,
    price: singleProductPrice.textContent,
    lense: "",
    total: 1,
};

fetch(urlstring).then(function (result) {
    return result.json();

})
    .then(function (json) {
        let singleProductShow = json;
        showItem(singleProductShow);
    }).catch(function (error) {
        console.log(error.message);
    });
//----------------------------------------------------------------------
// single product showcase

function showItem(singleProductShow) {
    singleProductName.textContent = singleProductShow.name;
    pageTiltle.textContent = singleProductShow.name;
    textProduct.textContent = singleProductShow.description;
    singleProductPrice.textContent = singleProductShow.price.toFixed(2);
    singlePic.src = singleProductShow.imageUrl;
    /*allocate values for cartitem object*/
    cartItem.name = singleProductName.textContent;
    cartItem.pic = singlePic.src;
    cartItem.price = singleProductPrice.textContent;
    // for loop for get data in the lenses array
    for (let i = 0; i < singleProductShow.lenses.length; i++) {
        const lense = document.createElement('option');
        lense.classList.remove("shadow-root");
        lense.textContent = singleProductShow.lenses[i];
        singleProductLenses.append(lense);
    };
    //----------------------------------------------------------------------------
    // lense selction

    const dropDownMenu = document.getElementsByClassName('form-control');
    for (let i = 0; i < dropDownMenu.length; i++) {
        dropDownMenu[i].addEventListener('change', e => {
            cartItem.lense = e.target.value;
        });
    }
}


addToCartButtonDom.addEventListener('click', cartNoUpdateing);
//---------------------------------------------
// cart function


function cartNoUpdateing() {

    // if no item
    if (JSON.parse(localStorage.getItem('productArray')) == null) {
        //update the cart
        cartItem.qty = 1;
        cartItem.price = parseInt(cartItem.price);
        cartItem.total = cartItem.qty * cartItem.price;
        cart.push(cartItem);
        localStorage.setItem('productArray', JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem('productArray'));
    } else {
        // cart has some items
        if (cart.some(oldItem => oldItem.name === cartItem.name && oldItem.lense === cartItem.lense)) {
            oldItem = cart.filter(p => (p.name === cartItem.name && p.lense === cartItem.lense));
            oldItem[0].qty += 1;
            oldItem[0].price = parseInt(oldItem[0].price);
            oldItem[0].total = oldItem[0].qty * oldItem[0].price;
            alert("Already in the cart");
            localStorage.setItem("productArray", JSON.stringify(cart));
            cart = JSON.parse(localStorage.getItem("productArray"));
        }
        else if (cart.some(oldItem => oldItem.name === cartItem.name && oldItem.lense !== cartItem.lense)) {
            cartItem.qty = 1;
            cartItem.price = parseInt(cartItem.price);
            cartItem.total = cartItem.qty * cartItem.price;
            cart.push(cartItem);
            localStorage.setItem('productArray', JSON.stringify(cart));
            cart = JSON.parse(localStorage.getItem("productArray"));
        }
        else {
            cartItem.qty = 1;
            cartItem.price = parseInt(cartItem.price);
            cartItem.total = cartItem.qty * cartItem.price;
            cart.push(cartItem);
            localStorage.setItem('productArray', JSON.stringify(cart));
            cart = JSON.parse(localStorage.getItem("productArray"));
        }
    }
    // /--------updateing cart counter----/
    cartCountDom.textContent = cart.length;

}









