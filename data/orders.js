export const orders = JSON.parse(localStorage.getItem('orders')) || []; //we are loading the order items from localStorage(since at the beginning we are not going to have any orders, so we are giving a default value[] empty array, || []), so if there is nothing in localStorage, its gonna use this empty array as a default

export function addOrder(order) {
    orders.unshift(order); //.unshift will add orders to the front of the array, because we want the recent orders to be at the front
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}