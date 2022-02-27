let carts = document.querySelectorAll('.add-cart');
let removeBtn = document.querySelector('#myBtn');
// removeBtn.addEventListener('click', function(){
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     cartItems.filter(item => item.id !== productid)
// })


var products = [{
        productid: '1',
        name: 'Phants',
        tag: 'product1',
        price: 40,
        inCart: 0

    },
    {
        productid: '2',
        name: 'Green dress with details',
        tag: 'product2',
        price: 40,
        inCart: 0
    },
    {
        productid: '3',
        name: 'Yellow dress with details',
        tag: 'product3',
        price: 40,
        inCart: 0
    },
    {
        productid: '4',
        name: 'Grey dress with details',
        tag: 'product4',
        price: 40,
        inCart: 0
    },
    {
        productid: '5',
        name: 'Black dress with details',
        tag: 'product5',
        price: 40,
        inCart: 0
    },
    {
        productid: '6',
        name: 'Blue dress with details',
        tag: 'product6',
        price: 40,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {

        document.querySelector('.cartt span').textContent = productNumbers;
    }
}


function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cartt span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cartt span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.productid] == undefined) {
            cartItems = {
                ...cartItems,
                [product.productid]: product
            }
        }
        cartItems[product.productid].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.productid]: product
        }
    }



    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost === null) {
        localStorage.setItem('totalCost', product.price);
    } else {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }

}



function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productContainer = document.getElementById("products-container");

    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);

    if (cartItems && productContainer) {
        productContainer.innerHTML += '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="container-fluid">
          <div class="row ">
            <div class="col-xl-11 col-lg-10 col-md-11 lops" >
                
                <div class="container-fluid number-of">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3">
                            <img src="images/${item.tag}.png" alt="">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-5">
                            <p><strong>${item.name}</strong></p>
                            
                            <p>color: multi color</p>
                            <div class="d-flex">
                                <div class="grey">
                                    <label for="size-selector">size :</label>
                                    <select name="small" id="size-selector" class="grey">
                                        <option value="medium">Onesize</option>
                                        <option value="medium">S</option>
                                        <option value="large">M</option>
                                        <option value="mercedes">L</option>
                                        <option value="xlarge">XL</option>
                                    </select>
                                </div>
                                <div class="qty-container">
                                    <label for="qty">qty :</label>
                                    <select name="small" id="qty">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5 col-sm-4">
                            <p>Rs:${item.price}</p>
                            <strike>Rs : 2748</strike>(60% Off)
                            <p>Delivery in 4-6 days</p>
                        </div>
                        <hr>
                        <div class="d-flex extra">
                        <button class="rm toRemove" id = "myBtn">Remove</button>
                             | 
                             <button class="rm">Move To Wishlist</button>
                        </div>
                        
                    </div>
                   
                </div>
                

            </div>
            
        </div>
    </div>`



        });
        
        removeBtn.addEventListener('click', function(product){
            let cartItems = localStorage.getItem('productsInCart');
            cartItems = JSON.parse(cartItems);
            cartItems.filter(item => item.productid !== product)
        })

    }




}





onLoadCartNumbers();
displayCart();




