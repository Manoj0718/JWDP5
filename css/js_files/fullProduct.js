
// const { response } = require("express"); this is auto comoming
const api = "http://localhost:3000/api/cameras/";

let productInfoClick = document.getElementById("productInfoRequest");
let productInfoView = document.getElementById("productInfoRequestAnswer");
let cart = document.getElementById("cart");

let cartView = [];



// make the API call for product view for getting products


fetch(api)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        let productdata = data;

        productdata.forEach(element => {
            const productCard = document.createElement('div');
            productCard.classList.add('card', 'col-md-12', 'col-lg-5', 'm-2');
            productCard.setAttribute("id", element.name);

            const productTitle = document.createElement('h3');
            productTitle.classList.add('card-tilte', 'text-center', 'text-uppercase', 'pb-2');

            const productImage = document.createElement('img');
            productImage.classList.add('card-img-top', 'p-2');

            const productText = document.createElement("p");
            productText.classList.add("card-text", 'pb-2');

            const productPrice = document.createElement("p");
            productPrice.classList.add("text-center")

            const productPr = document.createElement("form-control");
            productPr.classList.add("text-center")

            const viewMoreButton = document.createElement('btn');
            viewMoreButton.classList.add("btn-primary", 'text-center', 'p-2', 'mb-2', 'font-weight-bold');
            viewMoreButton.setAttribute("id", element.name);

            productPr.textContent = element.lenses;
            productTitle.textContent = element.name;
            productText.textContent = element.description;
            productImage.src = element.imageUrl;
            // price with $ sign , fixing two decimal , bcz of price
            productPrice.textContent = '$' + '  ' + element.price.toFixed(2);
            viewMoreButton.textContent = "View More"
            productInfoView.appendChild(productCard);
            productCard.append(productTitle, productText, productPr, productImage, productPrice, viewMoreButton);

            // viewMoreButton button click load product page -start
            viewMoreButton.addEventListener("click", () => {
                viewMoreButton.classList.add('bg-success');


            })


        });
        return productdata;


    })
    .catch(function (err) {
        console.log('Fetch problem: ' + err.message);
    });


// finish fetchKKKKKKKKKKKK


