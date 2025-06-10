import { cart } from '../../data/cart.js';
import { getDeliveryOption } from '../../data/delivery-options.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
  //Steps
  //1)Save the data
  //2)Generate the HTML
  //3)Make it interactive

  //To calculate the cost
  //1) Loop through the cart
  //2) For each product calculate price*quantity
  //3) Add everything together

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    //we first multiply the quantity with the price of one product and keep adding

    //shippingcost
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents; //we add the shippingcost of both the products
    totalQuantity += cartItem.quantity;


  });
  console.log(productPriceCents);
  console.log(shippingPriceCents);

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTaxCents * 0.1 //calculating 10%

  const totalCents = totalBeforeTaxCents + taxCents; //totalPrice


  //to get the deliveryOption.priceCents, we get the deliveryOptionId from the cartItem and then run the function getDeliveryOption in delivery-options.js

  //Now we are gonna generate the HTML



  let paymentSummaryHTML = '';

  let html = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    
    `;
  paymentSummaryHTML += html;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', { //the await is gonna wait for fetch to finish or get a response from backend
          method: 'POST',
          headers: { //headers gives the backend more information about our request
            'Content-Type': 'application/json' //this tells the backend, what type of data we are sending in our request, here we are sending some jsoN
          },
          body: JSON.stringify({ //the actual data, we are sending to the backend
            cart: cart
          })
        }); //we are going to send the cart to the backend, so we use POST request
        const order = await response.json() //since response.json() is also a promise, so we use await for it to finish before going to the next line
        console.log(order);
        addOrder(order); //sending the order to the function in orders.js file
      } catch (error) {
        console.log('Unexpected Error. Please try again later')
      }

      //To go to the orders page, right after clicking the place your order button, we are using window.location property
      window.location.href = 'orders.html';

    });

}