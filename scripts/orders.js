import { orders } from "../data/orders.js";
function generateOrder() {
    orders.forEach((order) => {

    })
    html = `
            <div class="product-image-container">
              <img src="images/products/intermediate-composite-basketball.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Intermediate Size Basketball
              </div>
              <div class="product-delivery-date">
                Arriving on: June 17
              </div>
              <div class="product-quantity">
                Quantity: 2
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
    `;

}