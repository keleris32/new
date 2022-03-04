/**
 * Here i defined utility functions that you can use repeated
 * without having to duplicate same code all over your codebase
 */

// -------- Utility Functions ------------------->

// set the product to local storage
function setProductToStorage(products) {
  localStorage.setItem('productsData', JSON.stringify(products));
}

// get the products stored in local storage
function getProductsFromStorage() {
  return JSON.parse(localStorage.getItem('productsData'));
}

// set the number of cart items to local storage
function setCartNumbersToStorage(number) {
  localStorage.setItem('cartNumbers', number);
}

// get the number of cart items from local storage
function getCartNumbersFromStorage() {
  const number = localStorage.getItem('cartNumbers');

  return parseInt(number);
}

// set the total cost of items to local storage
function setTotalCostToStorage(number) {
  localStorage.setItem('totalCost', number);
}

// get the total cost of items from local storage
function getTotalCostFromStorage() {
  const number = localStorage.getItem('totalCost');

  return parseInt(number);
}

// -------- Utility Functions ------------------->

function checkStorageForProducts() {
  // Get the products in storage
  let products = getProductsFromStorage();

  // Check if there are any products in storage
  // if there arent, then initialize an empty array and set it in storage
  if (products === null) {
    let initialListOfProducts = [];
    setProductToStorage(initialListOfProducts);
  }
}

let carts = document.querySelectorAll('.add-cart');
let removeBtn = document.querySelector('#myBtn');

var products = [
  {
    productid: '1',
    name: 'Phants',
    tag: 'product1',
    price: 40,
    inCart: 0,
  },
  {
    productid: '2',
    name: 'Green dress with details',
    tag: 'product2',
    price: 40,
    inCart: 0,
  },
  {
    productid: '3',
    name: 'Yellow dress with details',
    tag: 'product3',
    price: 40,
    inCart: 0,
  },
  {
    productid: '4',
    name: 'Grey dress with details',
    tag: 'product4',
    price: 40,
    inCart: 0,
  },
  {
    productid: '5',
    name: 'Black dress with details',
    tag: 'product5',
    price: 40,
    inCart: 0,
  },
  {
    productid: '6',
    name: 'Blue dress with details',
    tag: 'product6',
    price: 40,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    addProductToCart(products[i]);
    numberOfProductsInCart();
    totalCostOfProductsInCart(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = getCartNumbersFromStorage();
  if (productNumbers) {
    document.querySelector('.cartt span').textContent = productNumbers;
  }
}

function addProductToCart(product) {
  // First check if there are products in storage
  // so that if there isn't any, then it would set an empty array
  checkStorageForProducts();

  let products = getProductsFromStorage();

  // push a new product into the empty array or array of products
  products.push(product);

  // Set products back to storage
  setProductToStorage(products);
}

function numberOfProductsInCart() {
  // get the number of products from storage
  const currentNumber = getCartNumbersFromStorage();

  if (currentNumber) {
    let updatedNumber = currentNumber + 1;

    setCartNumbersToStorage(updatedNumber);
    document.querySelector('.cartt span').textContent = updatedNumber;
  } else {
    setCartNumbersToStorage(1);
    document.querySelector('.cartt span').textContent = 1;
  }
}

function totalCostOfProductsInCart(product) {
  const currentCost = getTotalCostFromStorage();

  if (currentCost) {
    let updatedCost = currentCost + product.price;

    setTotalCostToStorage(updatedCost);
  } else {
    setTotalCostToStorage(product.price);
  }
}

function removeItemFromCart(product) {
  let products = getProductsFromStorage();

  if (products === null) {
    return;
  }

  // If the selected product matches the product in the cart
  // then remove it from the cart and set the new array of products
  // back to storage
  for (let i = 0; i < products.length; i++) {
    if (products[i].productid === product.productid) {
      products.splice(i, 1);

      setProductToStorage(products);
    }
  }
}

function displayCart() {
  // get the products from local storage
  const cartItems = getProductsFromStorage();

  let productContainer = document.getElementById('products-container');

  let cartCost = getTotalCostFromStorage;
  console.log(cartItems);

  if (cartItems && productContainer) {
    productContainer.innerHTML += '';

    // You dont need to use Object.values again
    // cartItems is already an Array.
    cartItems.map((item) => {
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
                        <button class="rm toRemove" id="myBtn">Remove</button>
                             | 
                             <button class="rm">Move To Wishlist</button>
                        </div>
                        
                    </div>
                   
                </div>
                

            </div>
            
        </div>
    </div>`;

      //   removeBtn.addEventListener('click', (item) => {
      //     removeItemFromCart(item);
      //   });
    });
  }
}

onLoadCartNumbers();
displayCart();
