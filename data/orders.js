export const orders = JSON.parse(localStorage.getItem('orders')) || []; //we are loading the order items from localStorage(since at the beginning we are not going to have any orders, so we are giving a default value[] empty array, || []), so if there is nothing in localStorage, its gonna use this empty array as a default

export function addOrder(order) {
    orders.unshift(order); //.unshift will add orders to the front of the array, because we want the recent orders to be at the front
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
console.log(orders);

function renderOrdersHTML() {
    let orderSummaryHTML = '';
    orders.forEach((orderItem) => {
        const orderId = orderItem.id;
        const orderTime = orderItem.orderTime;
        const TotalCost = orderItem.totalCostCents;
        orderItem.products.forEach((productDetails) => {
            const productId = productDetails.productId;
            const deliveryTime = productDetails.
                estimatedDeliveryTime;
            const quantity = productDetails.quantity;



            orderSummaryHTML = '';

            let html = `
            <div class="product-image-container">
              <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
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
            orderSummaryHTML += html;
        })
        console.log(orderSummaryHTML);
    });
    document.querySelectorAll('.js-order-details').innerHTML = orderSummaryHTML;
}
renderOrdersHTML();

