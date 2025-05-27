import {cart, addToCart} from '../data/cart.js'; //importing the cart variable from cart.js

import {products} from '../data/products.js';

import { formatCurrency } from './utils/money.js';

//To import everything from a file (import * as cartModule from '../data/cart.js' )



//we need to save data(information about our products), so we will store all of our information data in this js file

//we are creating a list of products
//and for each product we have product name, price, rating so for that we will use object
//so inside the list we create an object

//now we will use the already created products list that is provided by the youtuber, so we will comment out our list
/*const product = [{ //for the first product
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: { //rating has two things,the no of stars and the count so we created an object for rating
        stars: 4.5,
        count: 87
    },
    priceCents: 1090 //js has some problems in 0.1 or 0.9 so we store in cents(it means $10.90)
}, { //for the second product
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
        stars: 4,
        count: 127
    },
    priceCents: 2095
}, { //for the third product
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
        stars: 4.5,
        count: 56
    },
    priceCents: 799
}, {
    image: 'images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster - Black',
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899
}];
*/
//NOW WE WILL BE GENERATING HTML USING THIS DATA INSTEAD OF WRITING THE HTML MANUALLY

//TO GENERATE THE HTML, WE CAN LOOP THROUGH THE PRODUCTS ARRAY and FOR EACH OF THESE PRODUCTS WE ARE GONNA CREATE SOME HTML

//in this forEach loop, it takes each object, stores it in the parameter called product and then runs the function

//NOW THE PRODUCTS LIST IS COMING FROM THE products.js FILE

let productsHTML = '';

products.forEach((product) => { //basically we are looping through each product inside the array and creating html for each product
    let html = `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"> <!--we multiplied it by 10 because the image is stored in that notation only for example if the rating is 4.5 the image is stored as 45-->
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}"> <!--to add a data attribute to each of the buttons so that when we click an add-to-cart button, we know which product to add-->
            Add to Cart
          </button>
        </div>
    `;
    //the last step is to combine all the html together and put it all on the web page
    productsHTML+=html;
});

console.log(productsHTML);

//displaying the html on the page
document.querySelector('.js-products-grid').innerHTML = productsHTML;



function updateCartQuantity() {
    let totalcartQuantity = 0;

    //calculate the total quantity of the cart
    cart.forEach((cartItem) => {// we loop through the list of objects and calculate the quantity of every item
      totalcartQuantity+= cartItem.quantity;
    })

    //now we are updating the top right icon number 
    document.querySelector('.js-cart-quantity').innerHTML = totalcartQuantity;
    
    console.log(totalcartQuantity);
    console.log(cart);
}

//Functionality of the Add to Cart Button
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  //we are adding a loop here because we want to select all the buttons with add to cart
  button.addEventListener('click', () => {
    //console.log('added product');
    console.log(button.dataset.productId); //dataset property gives us all the data attributes attached to the add to cart button(i.e the product id in our case) -> now to only get the product name, we convert product-id to productId
    const productId = button.dataset.productId; //storing hte product id in a variable

    addToCart(productId);
    updateCartQuantity(); //this updates the cart quantity on the top right corner of the web page
     
  });
});


//Data Attribute - is just another HTML attribute and it allows us to attach any information to an element
//data attributes have to start with data-
//we added a data attribute above in the html code (data-product-name="${product.name}")

//MODULES
//Problem without modules - Earlier when we had a file called cart.js and inside that we had a variable called cart, we could not create another variable called cart inside any other js file. This would create a naming conflict

// Solution with modules - It removes the risk of naming conflicts with modules. We create a container for eg. now the cart variable will be contained inside the cart.js file.

//To create a module, we need to make sure of two things
//1) Create a file
//2) Don't load the file with <script>

//For eg we need to access a variable out of a file. To do that, we can do these things:
//1) Add type="module" attribute
//2) Export
//3) Import 