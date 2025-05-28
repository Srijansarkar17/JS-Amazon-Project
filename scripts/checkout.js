import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js'; //.. represents the folder outside the current folder(scripts)
import { formatCurrency } from './utils/money.js'; // ./ represents the current folder

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; //instead of using script tag to load the code in the html file, we used something called as an ESM version which can be imported

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

hello(); //the external library that was imported in checkout.html is used now

const today = dayjs(); //the dayjs library gives us the current date and time

const deliveryDate = today.add(7, 'days'); //this will add 7 days to today's date
console.log(deliveryDate.format('dddd, MMMM D')); //we are formatting the date, for this refer the dayjs documentation

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    //we are getting the productId from the cart variable of the cart.js file, but we also need to get the product image, the product name and all that, for that we have to use the products array, in that products array, we are gonna find the matching productId and find the product details from the products array
    const productId = cartItem.productId; //first we are getting the productId from the cart variable inside the cart.js file
    let matchingProduct;
    products.forEach((product) => { //then we are looping through the products array inside products.js file to check for the productid and get the matching product details
        if (product.id === productId){
            matchingProduct = product; //we are getting the full product details
        }
    });
    //console.log(matchingProduct); --> gets all the matching productdetails for the corresponding productId
    let html = `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"> <!--earlier the delivery option was same between both the socks and the basketball. Means we can only check only one circle out of the six circles of socks and basketball because earlier the name="delivery-option-${matchingProduct.id}", now each product is going to have a different delivery option which the user can choose because the name="delivery-option-productid"-->
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
    `;
    cartSummaryHTML+=html;
});
console.log(cartSummaryHTML);

//since the order-summary class contains both the cart-item-containers so we add the html file inside that
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

//Making the Delete Link of the products interactive
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      console.log('Delete');
      //when we click the delete link, we will do two things:
      //1) Remove the product from the cart
      //2) Update the HTML

      //To get to know which product to delete, we are going to add a data-attribute to the delete link(the product id), so that it knows which product to remove
      const productId = link.dataset.productId; //the product-id in HTML is changed to productId
      //console.log(productId);
      removeFromCart(productId); //function from cart.js
      //console.log(cart);

      //We also have to update the HTML after removing the product from the cart
      //Steps:
        //1)Use DOM to get the element to remove
        //2)Use .remove() method to remove it from the page

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      console.log(container);
      container.remove(container)
    });
  });

//we have to calculate the delivery date and display(choose a delivery option):
//Steps to do that is:
  //1)Get today's date using dayjs library
  //2)Do calculations(Add 7days, ...)
  //3)Display the date in an easy-to-read format