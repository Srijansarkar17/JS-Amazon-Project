import { cart } from '../../data/cart.js';
import { getDeliveryOption } from '../../data/delivery-options.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

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
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        //we first multiply the quantity with the price of one product and keep adding

        //shippingcost
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents; //we add the shippingcost of both the products
        
    });
    console.log(productPriceCents);
    console.log(shippingPriceCents);

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    
    const taxCents = totalBeforeTaxCents*0.1 //calculating 10%

    const totalCents = totalBeforeTaxCents + taxCents; //totalPrice


    //to get the deliveryOption.priceCents, we get the deliveryOptionId from the cartItem and then run the function getDeliveryOption in delivery-options.js

    //Now we are gonna generate the HTML

    let paymentSummaryHTML = '';

    let html = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
    
    `
    paymentSummaryHTML+=html;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}