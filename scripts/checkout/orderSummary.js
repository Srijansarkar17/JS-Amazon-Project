import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products , getProduct} from '../../data/products.js'; //.. represents the folder outside the current folder(scripts)
import { formatCurrency } from '../utils/money.js'; // ./ represents the current folder

import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; //instead of using script tag to load the code in the html file, we used something called as an ESM version which can be imported

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import {deliveryOptions, getDeliveryOption} from '../../data/delivery-options.js'; //importing the deliveryOptions object that stores the delivery data

import { renderPaymentSummary } from './paymentSummary.js';
hello(); //the external library that was imported in checkout.html is used now

const today = dayjs(); //the dayjs library gives us the current date and time

const deliveryDate = today.add(7, 'days'); //this will add 7 days to today's date
console.log(deliveryDate.format('dddd, MMMM D')); //we are formatting the date, for this refer the dayjs documentation

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    //we are getting the productId from the cart variable of the cart.js file, but we also need to get the product image, the product name and all that, for that we have to use the products array, in that products array, we are gonna find the matching productId and find the product details from the products array
    const productId = cartItem.productId; //first we are getting the productId from the cart variable inside the cart.js file
    const matchingProduct = getProduct(productId); 
    //console.log(matchingProduct); --> gets all the matching productdetails for the corresponding productId
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs(); //get today's date
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    ); //we are adding the no of days to deliver from the current date. That we are getting from the deliveryOptions object

    const dateString = deliveryDate.format('dddd, MMMM D'); //converts in an easy to read format like Tuesday, June 21
    let html = `
      <div class="cart-item-container
      js-cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
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
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link
                    js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)} <!--we are using the deliveryOptionsHTML code below to generate the HTML-->
                </div>
              </div>
            </div>
      
      `;
    cartSummaryHTML += html;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html1 = '';
    //Steps
    //1)we are gonna loop through deliveryOptions
    //2)For each option, we generate some HTML
    //3)Combine the HTML together
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs(); //get today's date
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      ); //we are adding the no of days to deliver from the current date. That we are getting from the deliveryOptions object

      const dateString = deliveryDate.format('dddd, MMMM D'); //converts in an easy to read format like Tuesday, June 21

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;//if the priceCents from the deliveryOptions object is 0, then we display free, otherwise we display the price of delivery that we fetch from the deliveryOptions object


      const isChecked = deliveryOption.id === cartItem.deliveryOptionId; //to check if the deliveryOption.id matches the deliveryOptionId in the cart: this is done to automatically check one radio button when we enter the page
      html1 += `
                  <div class="delivery-option js-delivery-option"
                  data-product-id="${matchingProduct.id}"
                  data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                      ${isChecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>
      `
    });
    return html1;
    //html+= means combining the html
  }
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
        container.remove();
        renderPaymentSummary(); //upon clicking delete button, we again change the payment section according to the updated data
      });
    });

  //we have to calculate the delivery date and display(choose a delivery option):
  //Steps to do that is:
  //1)Get today's date using dayjs library
  //2)Do calculations(Add 7days, ...)
  //3)Display the date in an easy-to-read format


  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;

        //we are getting the productId and the deliveryOptionId from the data-attribute in html code
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();//after updating the data, we re-run the code to re-generate all of the html, whenever we change the radio-button so that the date automatically changes
        renderPaymentSummary(); //when we change the delivery option, again we change the payment section according to the radio button selected
      });

      //we used this to update the delivery date in the cart when we choose the radio buttons
    });

  //right now to see the change in the page after clicking a radio button, we need to explicitely refresh the page, but we need to be able to see the changes in the price and date as soon as we change the radio button. For that we need a function that will re-run the html as soon as we change the radio-button

}
//we put all of our code inside a function called renderOrderSummary

