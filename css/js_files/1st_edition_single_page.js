// const { json } = require("express");

const cartCountDom = document.getElementById("cart_count"); /* cart count */
cartCountDom.style.color = "#F6EDD8";
cartCountDom.classList.add('text-decoration-none');
const singleProductLenses = document.getElementById("lensessell");
// add to cart button
const addToCartButtonDom = document.getElementById("buy_Button");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const urlstring = "http://localhost:3000/api/cameras/" + id;
// console.log(urlstring);

// product show case ids
const singleProductName = document.getElementById('single_Product_Name');
const singleProductPic = document.getElementsByClassName("card-img");
const textProduct = document.getElementById("text_Product");
const singleProductPrice = document.getElementById('Product_Price');
const pageTiltle = document.getElementById('page_Name');
const singlePic = document.getElementById("image");
// retrieve current cart if it exists. If it doesn't create an empty cart array
let cart = JSON.parse(localStorage.getItem('productArray')) || [];


const cartItem = {
    pic: singlePic.src,
    name: singleProductName.textContent,
    qty: 0,
    price: singleProductPrice,
    lense: "",
};

fetch(urlstring).then(function (result) {
    return result.json();

})
    .then(function (json) {
        let singleProductShow = json;
        // add function for initialize data
        showItem(singleProductShow);



        // console.log(singleProductShow);


    }).catch(function (error) {
        console.log(error.message)
    });

// single product showcase
function showItem(singleProductShow) {
    singleProductName.textContent = singleProductShow.name;
    pageTiltle.textContent = singleProductShow.name;

    textProduct.textContent = singleProductShow.description;
    singleProductPrice.textContent = ' $ ' + singleProductShow.price.toFixed(2);
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

    }
    //console.log(singleProductName.textContent);
    // lense selction

    const dropDownMenu = document.getElementsByClassName('form-control');

    for (let i = 0; i < dropDownMenu.length; i++) {
        dropDownMenu[i].addEventListener('change', getLense);
        // we have to make this validated not yet done 
    }
    function getLense($event) {
        cartItem.lense = $event.target.value;
        //console.log(cartItem);
    };
}
addToCartButtonDom.addEventListener('click', cartNoUpdateing);
// <-------start storage---->

// here is the function for cart count updateing
// function cartNoUpdateing() {
//     cartCountDom.textContent = cart.length;
//     // not equal
//     if (JSON.parse(localStorage.getItem("productArray")) != null) {
//         let previousItem = JSON.parse(localStorage.getItem("productArray"));
//         console.log("previous item", previousItem);
//         // now checking 2nd condition

//         previousItem.map(data => {
//             if ((cartItem.name == data.name) && (cartItem.lense == data.lense)) {
//                 console.log("already in");
//                 data.qty++;
//                 //localStorage.setItem('productArray', JSON.stringify(cart));
//             }
//             // else if ((cartItem.name == data.name) && (cartItem.lense != data.lense)) {
//             //     cartItem.qty = 1;
//             //     cart.push(cartItem);
//             // } 
//             cartItem.qty = 1;
//             //cart.push(cartItem);
//             localStorage.setItem('productArray', JSON.stringify(cart));



//             // cart.push(cartItem);
//             // else if ((cartItem.lense != data.lense) && (cartItem.name == data.name)) {
//             //     cartItem.qty = 1;
//             //     cart.push(cartItem)
//             //     localStorage.setItem('productArray', JSON.stringify(cart));
//             //     console.log('2nd theory')
//             // }
//             // else {
//             //     cartItem.qty = 1;
//             //     cart.push(cartItem)
//             //     console.log("3rd theory")
//             //     localStorage.setItem('productArray', JSON.stringify(cart));
//             // }
//             //localStorage.setItem('productArray', JSON.stringify(cart));

//         })

//     } else {
//         cartItem.qty = 1;
//         // console.log("cartItem product name", cartItem.name);
//         cart.push(cartItem);
//         localStorage.setItem('productArray', JSON.stringify(cart));
//     }
//     //localStorage.setItem('productArray', JSON.stringify(cart));
//     console.log("here is the cart", cart);
// }



//   } else {
// No web storage Support.
//console.log("no local storage")
//}


//}


//------>end--> //



// tried to do like this too
function cartNoUpdateing() {

    // /--------updateing cart counter----/
    cartCountDom.textContent = cart.length;
    //console.log(cart.length);
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage
        // not equal
        // i tried here imageing there is akrray of products
        // item is in the object in the cart


        if (cart.length > 0) {
            console.log("cart is not null", cart);
            for (let item of cart) {
                console.log('here oldItem', item);
                console.log(item.name);
                if ((item.name === cartItem.name) && (cartItem.lense === item.lense)) {
                    console.log("same item", item.qty);
                    console.log("item lense ", item.lense, "cart item Lense", cartItem.lense)
                    item.qty += 1;
                    console.log(typeof (item.qty))

                }
                else if ((item.name === cartItem.name) && (cartItem.lense !== item.lense) || ((item.name !== cartItem.name) && (cartItem.lense === item.lense))) {
                    cartItem.qty = 1;
                    cart.push(cartItem)
                    console.log("new add item with same name, different lense")
                    localStorage.setItem('productArray', JSON.stringify(cart));
                }
                else {
                    cartItem.qty = 1;
                    cart.push(cartItem)
                    localStorage.setItem('productArray', JSON.stringify(cart));
                    console.log("new add item with different name and lense")
                }
            }


        }
        else {
            cartItem.qty = 1;
            cart.push(cartItem);
            localStorage.setItem('productArray', JSON.stringify(cart));

        }
    }
}