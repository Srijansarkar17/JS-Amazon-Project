import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js'; //.. represents the folder outside the current folder(scripts)
import { formatCurrency } from './utils/money.js'; // ./ represents the current folder

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
    <div class="cart-item-container">
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
      console.log(productId);
      removeFromCart(productId); //function from cart.js
      console.log(cart);
    });
  });