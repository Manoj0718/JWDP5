// single product view page
// using URL query parameters

// import { parse } from "uuid";

// const { json } = require("express");

// import { get } from "mongoose";
const addToCart = document.getElementById("buy_Button");
const cartCount = document.getElementById("cart_count");
cartCount.style.color = "#F6EDD8";
const singleProductLenses = document.getElementById("lensessell");


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



// const viewMorereaquest = new XMLHttpRequest();
// viewMorereaquest.open('GET', urlstring);
// viewMorereaquest.send();

// viewMorereaquest.onreadystatechange = () => {
//     if ((viewMorereaquest.readyState === 4) && (viewMorereaquest.status === 200)) {
//         const reciveData = JSON.parse(viewMorereaquest.response);



//     }

// }
// i feel more comfertable with fetch
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

    // ------ pic cannt upload--


    singlePic.src = singleProductShow.imageUrl;
    // console.log(singleProductShow.imageUrl);


    // console.log(singleProductPic);
    // for loop for get data in the lenses array


    for (i = 0; i < singleProductShow.lenses.length; i++) {

        const lense = document.createElement('option');
        lense.classList.remove("shadow-root");
        lense.textContent = singleProductShow.lenses[i];
        singleProductLenses.append(lense);
        // console.log(lense);

    }
    // console.log(typeof singleProductLenses);

    // <!----------------end of fetch -----------!>
    // cart count updateing through local storage
    // <!--start--/>

    cartCount.classList.add('text-decoration-none');

    // add to cart button
    const addToCartButton = document.getElementById("buy_Button");
    // console.log(addToCartButton);
    addToCartButton.addEventListener("click", function () {
        // console.log("add to cart");

        updateCartCount();

    })
    // <!-- implementing buttons-->


    // first cart list variable
    // this is array
    const cartList = [];
    // let productQuentityInput = document.querySelector(".count");
    // productQuentityInput.addEventListener("input", ($e) => {
    //     let productQty = $e.target.value;
    //     console.log(productQty);
    // })
    

    function updateCartCount() {
        // quentity of product input i tried getElementById
        let quentity = document.getElementById("Qty_input");
        let a;
        console.log(quentity.value);
        // //    start  lenese selection output
        // let lenseSelection = [];
        for (let i = 0; i < singleProductLenses.length; i++) {
            singleProductLenses.addEventListener('change', ($event) => {
                a = $event.target.value;

                // console.log(a);
                console.log(cartItem, 'cart item');
            })
            //     return lenseSelection;
            console.log(a);
        }// // // end select lense output
        {

            if (typeof (Storage) !== "undefined") {

                let cartItem = {
                    name: singleProductShow.name,
                    price: singleProductShow.price,
                    id: singleProductShow._id,
                    // lense: here supposed to be come the selected lense,
                    productCount: parseInt(quentity.value),
                }

                // push cart Item object to cart List array

                console.log(cartList);

                //    be carefull in here, cart item object need to be in the
                // cartList array
                // push cart Item object to cart List array
                cartList.push(cartItem);
                // if there is no  any item
                if (JSON.parse(localStorage.getItem("cartListValue")) === null) {
                    localStorage.setItem("cartListValue", JSON.stringify(cartList))
                } else {
                    // object that was in the cart List
                    const localItems = JSON.parse(localStorage.getItem("cartListValue"));

                    // console.log(localItems);
                    // console.log(cartItem);// cart Item object we added , 2nd item
                    // console.log(cartList); // cart List Array
                    // 01. now we'll gonna check same id
                    // 02. then we can add Qentity
                    localItems.map(data => {
                        if (cartItem.name === data.name) {
                            console.log("true");
                            console.log(data.productCount);
                            // data.productCount = parseInt(data.productCount);
                            console.log(data.productCount);
                            data.productCount = parseInt(data.productCount + quentity.value);

                            // console.log(cartItem.productCount);
                            console.log(data.productCount);
                            console.log(quentity.value);
                        } else {
                            cartList.push(data); // we push data here
                        }
                    });
                    // cartList.push(data); // now we add different id product to the cartlIST array
                    localStorage.setItem("cartListValue", JSON.stringify(cartList));
                    console.log(cartList);
                    console.log(localItems);
                    console.log(cartItem);// cart Item object
                    console.log(cartList); // cart List Array

                }

            } else {
                // Sorry! No Web Storage support..
                // console.log("no local storage")
            }

        }
        // // quentity of product input i tried getElementById
        // with the shopping cart count
        const shoppingcartQty = JSON.parse(window.localStorage.getItem('cartListValue'));
        cartCount.textContent = shoppingcartQty.length;
        // console.log(shoppingcartQty.length);


    }
}
