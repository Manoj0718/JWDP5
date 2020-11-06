const api = "http://localhost:3000/api/cameras/";

let productInfoClick = document.getElementById("productInfoRequest");
let productInfoView = document.getElementById("productInfoRequestAnswer");


// get data from backend through fetch


fetch(api).then(function (responce) {
    return responce.json();

}).then(function (jso) {
    let products = jso;
    initialize(products);
    // set local storage


}).catch(function (err) {
    console.log('Fetch problem: ' + err.message);
});
// product view page
function initialize(products) {
    for (let product of products) {

        // products card
        const productCard = document.createElement('div');
        productCard.classList.add('card', 'col-md-12', 'col-lg-5', 'm-2');
        productCard.setAttribute("id", product._id);
        productCard.setAttribute("href", product._id);
        console.log(product._id);


        const productTitle = document.createElement('h2');
        productTitle.classList.add('card-tilte', 'text-center', 'text-uppercase', 'pb-2');

        const productImage = document.createElement('img');
        productImage.classList.add('card-img-top', 'p-2');

        const productText = document.createElement("p");
        productText.classList.add("card-text", 'p-2');

        const productPrice = document.createElement("p");
        productPrice.classList.add("text-center")



        const viewMoreButton = document.createElement('a');
        viewMoreButton.classList.add("btn-primary", "btn-overlay", 'text-center', 'p-2', 'mb-2', 'font-weight-bold');
        viewMoreButton.setAttribute("href", "single_product.html?id=" + product._id);
        viewMoreButton.setAttribute('id', 'buttonForViewMore')

        // for loop for get leses array inside object
        const lenAll = document.createElement('div');
        console.log(product.lenses);


        for (i = 0; i < product.lenses.length; i++) {


            const lense = document.createElement('li');
            lense.classList.add("list-group-item", "mb-2");
            lense.textContent = product.lenses[i];
            lenAll.append(lense);

        }


        productTitle.textContent = product.name;
        productText.textContent = product.description;

        productImage.src = product.imageUrl;
        console.log(product.imageUrl);
        // price with $ sign , fixing two decimal , bcz of price
        productPrice.textContent = '$' + '  ' + product.price.toFixed(2);
        viewMoreButton.textContent = "View More";
        productInfoView.appendChild(productCard);
        productCard.append(productTitle, productImage, productText, productPrice, lenAll, viewMoreButton);



        // document.getElementById('buttonForViewMore').onclick = function () {

        //     const viewMorereaquest = new XMLHttpRequest();

        //     const queryString = window.location.search;
        //     const parameters = new URLSearchParams(queryString);

        //     viewMorereaquest.open('GET', "http://localhost:3000/api/cameras" + "/:_id ");


        //     viewMorereaquest.onreadystatechange = () => {
        //         if ((viewMorereaquest.readyState === 4) && (viewMorereaquest.status === 200)) {
        //             const reciveData = JSON.parse(viewMorereaquest.response);
        //             console.log(reciveData);

        //         }
        //     }
        //     viewMorereaquest.send();


        // }










        // viewMoreButton button click load product page -start -// single product view
        //     const singleView = viewMoreButton.addEventListener("click", () => {
        //         viewMoreButton.classList.add('bg-success');



        //         // using URL query parameters

        //         // const queryString = window.location.search;
        //         // const parameters = new URLSearchParams(queryString);
        //         // const value = parameters.get('id');
        //         // // the specific api we need to fetch




        //         // fetch(api).then(function (re) {
        //         //     return re.json();

        //         // }).then(function (json) {
        //         //     let p = json;
        //         //     show(p);
        //         //     console.log(p);

        //         // }).catch(function (err) {
        //         //     console.log('Fetch problem: ' + err.message);
        //         // });

        //         // function show(p) {

        //         // }



        //         function makeRequest() {
        //             return new Promise((reso, rej) => {
        //                 const queryString = window.location.search;
        //                 const parameters = new URLSearchParams(queryString);
        //                 const value = parameters.get('id');
        //                 console.log(queryString);
        //                 console.log(parameters);
        //                 console.log(value);




        //                 let req = new XMLHttpRequest();
        //                 req.open("GET", api + value);
        //                 req.send();


        //                 req.onreadystatechange = () => {
        //                     if (req.readyState === 4) {
        //                         reso(JSON.parse('umbrella'));
        //                     } else {
        //                         rej("error")
        //                     }
        //                 }


        //             });
        //         }




        //         async function singleProductView(respon) {
        //             try {
        //                 const res = await makeRequest(respon);
        //                 console.log(res);
        //             }
        //             catch (er) {
        //                 console.log(er);

        //             }







        //         }
        //         return singleProductView(respon);


        //     })





    }













}
